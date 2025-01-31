(define-constant ERR-ITEM-NOT-FOUND 1000)
(define-constant ERR-ITEM-ALREADY-SOLD 1001)
(define-constant ERR-INSUFFICIENT-FUNDS 1002)
(define-constant ERR-NOT-BUYER 1003)
(define-constant ERR-ITEM-ALREADY-DELIVERED 1004)
(define-constant FEE_PERCENTAGE 1)

(define-constant INTERMEDIARY-WALLET 'ST2NSQSBAR746ZA5JRW8HVREGV3A9C1Q958P3BPPD)

(define-map items
  item-id
  (tuple
    (name (string-ascii 50))
    (description (string-ascii 250))
    (price uint)
    (category (string-ascii 50))
    (location (string-ascii 50))
    (contact (string-ascii 20))
    (seller principal)
    (buyer (option principal))
    (state (string-ascii 15)))) ;; available, purchased, sold

(define-data-var next-item-id uint u1)

;; List an item for sale
(define-public (list-item (name (string-ascii 50)) (description (string-ascii 250)) (price uint) 
                          (category (string-ascii 50)) (location (string-ascii 50)) (contact (string-ascii 20)))
  (let
    (
      (item-id (var-get next-item-id))
    )
    (begin
      (map-insert items item-id
        (tuple
          (name name)
          (description description)
          (price price)
          (category category)
          (location location)
          (contact contact)
          (seller tx-sender)
          (buyer none)
          (state "available")))
      (var-set next-item-id (+ item-id u1))
      (ok item-id)
    )
  )
)

;; Purchase an item
(define-public (purchase-item (item-id uint))
  (let ((item (map-get? items item-id)))
    (asserts! (is-some item) (err ERR-ITEM-NOT-FOUND))
    (let ((item-details (unwrap-panic item)))
      (asserts! (is-eq (get state item-details) "available") (err ERR-ITEM-ALREADY-SOLD))
      (asserts! (>= (stx-get-balance tx-sender) (get price item-details)) (err ERR-INSUFFICIENT-FUNDS))

      ;; Transfer funds to intermediary wallet
      (stx-transfer? (get price item-details) tx-sender INTERMEDIARY-WALLET)

      ;; Update the item with buyer and state
      (map-set items item-id
        (merge item-details
          (tuple 
            (buyer (some tx-sender))
            (state "purchased"))))

      (ok true))))

;; Confirm delivery by buyer
(define-public (confirm-delivery (item-id uint))
  (let ((item (map-get? items item-id)))
    (asserts! (is-some item) (err ERR-ITEM-NOT-FOUND))
    (let ((item-details (unwrap-panic item)))
      (asserts! (is-eq (get buyer item-details) (some tx-sender)) (err ERR-NOT-BUYER))
      (asserts! (is-eq (get state item-details) "purchased") (err ERR-ITEM-ALREADY-DELIVERED))

      ;; Calculate the seller's payment (99%)
      (let ((price (get price item-details))
            (fee (/ (* price FEE_PERCENTAGE) 100)))
        (stx-transfer? (- price fee) INTERMEDIARY-WALLET (get seller item-details)))

      ;; Update delivery status
      (map-set items item-id
        (merge item-details
          (tuple (state "sold"))))

      (ok true))))

;; View all items listed by the current user
(define-public (get-my-listings)
  (ok
    (fold
      (lambda (entry result)
        (let ((item-id (get key entry))  ;; Extract the key (item-id)
              (item-data (get value entry)))  ;; Extract the value (item-data)
          (if (is-eq (get seller item-data) tx-sender)
              (cons {id: item-id, item: item-data} result)
              result)))
      '()
      (map entries items))))

;; View sold but undelivered items by the current user
(define-public (get-sold-undelivered-items)
  (ok
    (fold
      (lambda (entry result)
        (let ((item-id (get key entry))  ;; Extract the key (item-id)
              (item-data (get value entry)))  ;; Extract the value (item-data)
          (if (and
                (is-eq (get seller item-data) tx-sender)
                (is-eq (get state item-data) "purchased"))
              (cons {id: item-id, item: item-data} result)
              result)))
      '()
      (map entries items))))