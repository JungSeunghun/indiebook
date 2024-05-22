package com.example.usermanagementserver.signup.dto

data class UserRegistrationRequest(
    val userId: String,
    val password: String,
    val email: String,
    val userName: String,
    val birth: String?,
    val gender: String,
    val phoneNumber: String?,
    val address: String?
)
