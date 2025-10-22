import "@/global.css";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from '@/lib/schemas/authSchemas';

type AuthMode = "login" | "signin";

export default function AuthScreen() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  // Estados para formulario de login
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  // Estados para formulario de registro
  const [signupData, setSignupData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signupErrors, setSignupErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});

  const handleLogin = () => {
    try {
      loginSchema.parse(loginData);
      setLoginErrors({});
      console.log('Login exitoso:', loginData);
      // router.push('/screens/dashboard');
    } catch (error: any) {
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      error.errors.forEach((err: any) => {
        errors[err.path[0] as keyof LoginFormData] = err.message;
      });
      setLoginErrors(errors);
    }
  };

  const handleSignup = () => {
    try {
      signupSchema.parse(signupData);
      setSignupErrors({});
      console.log('Registro exitoso:', signupData);
      // router.push('/screens/dashboard');
    } catch (error: any) {
      const errors: Partial<Record<keyof SignupFormData, string>> = {};
      error.errors.forEach((err: any) => {
        errors[err.path[0] as keyof SignupFormData] = err.message;
      });
      setSignupErrors(errors);
    }
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    // Limpiar errores al cambiar de modo
    setLoginErrors({});
    setSignupErrors({});
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="w-full max-w-md">
        <Text className="text-4xl font-bold text-teal-600 mb-8 text-center">
          Bienvenido
        </Text>

        {/* Pestañas de Login/Sign In */}
        <View className="flex-row mb-8 bg-teal-50 rounded-lg p-1">
          <TouchableOpacity
            onPress={() => switchMode("login")}
            className={`flex-1 py-3 rounded-lg ${
              authMode === "login" ? "bg-teal-500" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                authMode === "login" ? "text-white" : "text-teal-600"
              }`}
            >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => switchMode("signin")}
            className={`flex-1 py-3 rounded-lg ${
              authMode === "signin" ? "bg-teal-500" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                authMode === "signin" ? "text-white" : "text-teal-600"
              }`}
            >
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de Login */}
        {authMode === "login" && (
          <>
            <View className="mb-4">
              <Text className="text-teal-700 font-semibold mb-2">Email</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="tu@email.com"
                placeholderTextColor="#5eead4"
                keyboardType="email-address"
                autoCapitalize="none"
                value={loginData.email}
                onChangeText={(text) => setLoginData({ ...loginData, email: text })}
              />
              {loginErrors.email && (
                <Text className="text-red-500 text-sm mt-1">{loginErrors.email}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-teal-700 font-semibold mb-2">Contraseña</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="••••••••"
                placeholderTextColor="#5eead4"
                secureTextEntry
                value={loginData.password}
                onChangeText={(text) => setLoginData({ ...loginData, password: text })}
              />
              {loginErrors.password && (
                <Text className="text-red-500 text-sm mt-1">{loginErrors.password}</Text>
              )}
            </View>

            <TouchableOpacity className="mb-6">
              <Text className="text-teal-500 text-right">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleLogin}
              className="bg-teal-500 rounded-lg py-4 shadow-lg mb-6"
            >
              <Text className="text-white text-center font-bold text-lg">
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Formulario de Sign In */}
        {authMode === "signin" && (
          <>
            <View className="mb-4">
              <Text className="text-teal-700 font-semibold mb-2">Nombre completo</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="Juan Pérez"
                placeholderTextColor="#5eead4"
                value={signupData.name}
                onChangeText={(text) => setSignupData({ ...signupData, name: text })}
              />
              {signupErrors.name && (
                <Text className="text-red-500 text-sm mt-1">{signupErrors.name}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-teal-700 font-semibold mb-2">Email</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="tu@email.com"
                placeholderTextColor="#5eead4"
                keyboardType="email-address"
                autoCapitalize="none"
                value={signupData.email}
                onChangeText={(text) => setSignupData({ ...signupData, email: text })}
              />
              {signupErrors.email && (
                <Text className="text-red-500 text-sm mt-1">{signupErrors.email}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-teal-700 font-semibold mb-2">Contraseña</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="••••••••"
                placeholderTextColor="#5eead4"
                secureTextEntry
                value={signupData.password}
                onChangeText={(text) => setSignupData({ ...signupData, password: text })}
              />
              {signupErrors.password && (
                <Text className="text-red-500 text-sm mt-1">{signupErrors.password}</Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="text-teal-700 font-semibold mb-2">Confirmar contraseña</Text>
              <TextInput
                className="bg-teal-50 border-2 border-teal-300 rounded-lg px-4 py-3 text-teal-900"
                placeholder="••••••••"
                placeholderTextColor="#5eead4"
                secureTextEntry
                value={signupData.confirmPassword}
                onChangeText={(text) => setSignupData({ ...signupData, confirmPassword: text })}
              />
              {signupErrors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">{signupErrors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity 
              onPress={handleSignup}
              className="bg-teal-500 rounded-lg py-4 shadow-lg mb-6"
            >
              <Text className="text-white text-center font-bold text-lg">
                Crear Cuenta
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Texto alternativo */}
        <View className="mt-6">
          <Text className="text-center text-gray-600">
            {authMode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <Text
              onPress={() => switchMode(authMode === "login" ? "signin" : "login")}
              className="text-teal-500 font-bold"
            >
              {authMode === "login" ? "Regístrate" : "Inicia sesión"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}