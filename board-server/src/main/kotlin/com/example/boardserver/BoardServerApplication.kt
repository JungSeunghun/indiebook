package com.example.boardserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BoardServerApplication

fun main(args: Array<String>) {
	runApplication<BoardServerApplication>(*args)
}
