package com.example.usermanagementserver.signup.service

import com.example.usermanagementserver.signup.dto.UserRegistrationRequest
import com.example.usermanagementserver.signup.exception.InvalidInputException
import com.example.usermanagementserver.signup.exception.UserAlreadyExistsException
import com.example.usermanagementserver.signup.model.UserAuth
import com.example.usermanagementserver.signup.model.UserKey
import com.example.usermanagementserver.signup.model.UserProfile
import com.example.usermanagementserver.signup.repository.UserAuthRepository
import com.example.usermanagementserver.signup.repository.UserKeyRepository
import com.example.usermanagementserver.signup.repository.UserProfileRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*


@Service
class UserService(
    private val userKeyRepository: UserKeyRepository,
    private val userAuthRepository: UserAuthRepository,
    private val userProfileRepository: UserProfileRepository,
    private val passwordEncoder: BCryptPasswordEncoder
) {
    suspend fun registerUser(request: UserRegistrationRequest): User {
        validateRequest(request)

        val existingUser = userRepository.findById(request.userId).awaitFirstOrNull()
        if (existingUser != null) {
            throw UserAlreadyExistsException("User with ID ${request.userId} already exists.")
        }

        val userKeyId = UUID.randomUUID().toString().replace("-", "")
        val encodedPassword = passwordEncoder.encode(request.password)
        val userKey = UserKey(userKeyId, request.userId)
        val userAuth = UserAuth(userKeyId, encodedPassword, "some_salt")
        val userProfile = UserProfile(
            userKeyId,
            request.email,
            request.userName,
            request.birth?.let { LocalDate.parse(it) },
            request.gender,
            request.phoneNumber,
            request.address
        )

        userKeyRepository.save(userKey).awaitFirstOrNull()
        userAuthRepository.save(userAuth).awaitFirstOrNull()
        userProfileRepository.save(userProfile).awaitFirstOrNull()

        return user
    }

    private fun validateRequest(request: UserRegistrationRequest) {
        if (request.userId.isBlank() || request.password.isBlank() || request.email.isBlank() || request.userName.isBlank() || request.gender.isBlank()) {
            throw InvalidInputException("All fields except birth, phoneNumber, and address are required.")
        }

        if (request.password.length < 6) {
            throw InvalidInputException("Password must be at least 6 characters long.")
        }

        if (!request.email.contains("@")) {
            throw InvalidInputException("Invalid email format.")
        }

        if (request.gender !in listOf("male", "female", "other")) {
            throw InvalidInputException("Gender must be 'male', 'female', or 'other'.")
        }
    }
}