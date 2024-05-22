package com.example.usermanagementserver.signup.controller

import com.example.usermanagementserver.signup.dto.UserRegistrationRequest
import com.example.usermanagementserver.signup.service.UserService
import kotlinx.coroutines.reactor.mono
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/v1/api/users")
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun registerUser(
        @RequestBody request: UserRegistrationRequest
    ) = mono {
        userService.registerUser(userId, password, email, userName, birth, gender, phoneNumber, address)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.badRequest().build()
    }
}