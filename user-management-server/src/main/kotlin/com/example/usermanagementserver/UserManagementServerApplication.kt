package com.example.usermanagementserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class UserManagementServerApplication

fun main(args: Array<String>) {
	runApplication<UserManagementServerApplication>(*args)
}
