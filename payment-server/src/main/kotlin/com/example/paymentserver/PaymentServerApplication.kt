package com.example.paymentserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PaymentServerApplication

fun main(args: Array<String>) {
    runApplication<PaymentServerApplication>(*args)
}
