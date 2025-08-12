"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  updateProfile: () => {}, // Added updateProfile to context value
  loading: true,
  isAuthenticated: false,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("exclu_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      localStorage.removeItem("exclu_user")
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    try {
      console.log("Login function called with email:", email)

      // Get all registered users
      const registeredUsers = JSON.parse(localStorage.getItem("exclu_registered_users") || "[]")
      console.log("Registered users:", registeredUsers)

      // Find user by email and password
      const foundUser = registeredUsers.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser

      setUser(userWithoutPassword)
      localStorage.setItem("exclu_user", JSON.stringify(userWithoutPassword))
      console.log("User logged in successfully:", userWithoutPassword)
      return userWithoutPassword
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const signup = (userData) => {
    try {
      console.log("Signup function called with:", userData)

      // Get existing registered users
      const registeredUsers = JSON.parse(localStorage.getItem("exclu_registered_users") || "[]")

      // Check if user already exists
      const existingUser = registeredUsers.find((u) => u.email === userData.email)
      if (existingUser) {
        throw new Error("User with this email already exists")
      }

      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        role: userData.role,
        createdAt: new Date().toISOString(),
        profilePicture: userData.profilePicture || null,
        ...(userData.role === "agency" && {
          agencyName: userData.agencyName,
          agencyId: userData.agencyId,
          markets: userData.markets,
          serviceType: userData.serviceType,
          description: userData.description,
        }),
        ...(userData.role === "creator" && {
          bio: userData.bio,
        }),
      }

      // Add to registered users array
      registeredUsers.push(newUser)
      localStorage.setItem("exclu_registered_users", JSON.stringify(registeredUsers))

      console.log("User account created:", newUser)
      return newUser
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem("exclu_user")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const updateProfile = (updatedData) => {
    try {
      console.log("Update profile function called with:", updatedData)

      // Get all registered users
      const registeredUsers = JSON.parse(localStorage.getItem("exclu_registered_users") || "[]")

      // Find and update the current user
      const userIndex = registeredUsers.findIndex((u) => u.id === user.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }

      // Update user data while preserving existing fields
      const updatedUser = {
        ...registeredUsers[userIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      }

      // Update in registered users array
      registeredUsers[userIndex] = updatedUser
      localStorage.setItem("exclu_registered_users", JSON.stringify(registeredUsers))

      // Remove password from user object before storing in current user
      const { password: _, ...userWithoutPassword } = updatedUser

      // Update current user state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("exclu_user", JSON.stringify(userWithoutPassword))

      console.log("Profile updated successfully:", userWithoutPassword)
      return userWithoutPassword
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile, // Added updateProfile to context value
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
