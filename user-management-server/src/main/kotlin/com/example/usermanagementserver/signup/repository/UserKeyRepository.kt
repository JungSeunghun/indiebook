package com.example.usermanagementserver.signup.repository

import com.example.usermanagementserver.signup.model.UserKey
import org.springframework.data.repository.kotlin.CoroutineCrudRepository

interface UserKeyRepository : CoroutineCrudRepository<UserKey, String>