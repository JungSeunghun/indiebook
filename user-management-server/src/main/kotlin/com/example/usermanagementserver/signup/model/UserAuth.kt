package com.example.usermanagementserver.signup.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table("user_auth")
data class UserAuth(
    @Id
    val userKeyId: String,
    val passwordHash: String,
    val salt: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)
