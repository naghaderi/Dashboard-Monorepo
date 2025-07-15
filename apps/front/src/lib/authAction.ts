"use server";

import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "./gqlQueries";
import { SignInFormSchema, SignUpFormSchema } from "./AuthSchemas";
import { SignInFormState, SignUpFormState } from "@/types/formState";
import { createSession } from "./session";
import { fetchGraphQL } from "./fetchGraphQL";
import { print } from "graphql";

// ============= signUp Action ================
export const signUp = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const rawValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = SignUpFormSchema.safeParse(rawValues);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      data: {
        name: String(rawValues.name ?? ""),
        email: String(rawValues.email ?? ""),
        password: String(rawValues.password ?? ""),
      },
      error: {
        name: fieldErrors.name,
        email: fieldErrors.email ?? ["Email is required"],
        password: fieldErrors.password,
      },
      message: "Please correct the highlighted fields",
    };
  }

  try {
    await fetchGraphQL(print(CREATE_USER_MUTATION), {
      input: { ...parsed.data },
    });

    return {
      data: parsed.data,
      error: {
        email: [],
      },
      message: "Account created successfully!",
    };
  } catch (err) {
    console.error(err);
    return {
      data: parsed.data,
      error: {
        email: ["An unexpected error occurred. Try again later."],
      },
      message: "Signup failed",
    };
  }
};

// ============= signIn Action ================
export const signIn = async (
  state: SignInFormState,
  formData: FormData
): Promise<SignInFormState> => {
  const rawValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = SignInFormSchema.safeParse(rawValues);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      data: {
        email: String(rawValues.email ?? ""),
        password: String(rawValues.password ?? ""),
      },
      error: {
        email: fieldErrors.email ?? ["Email is required"],
        password: fieldErrors.password,
      },
      message: "Please correct the highlighted fields",
    };
  }

  try {
    const res = await fetchGraphQL(print(SIGN_IN_MUTATION), {
      input: parsed.data,
    });
    const userData = res.signIn;
    await createSession({
      accessToken: userData.accessToken,
      user: {
        id: userData.id,
        name: userData.name,
        avatar: userData.avatar,
      },
    });

    return {
      data: parsed.data,
      error: {
        email: [],
        password: [],
      },
      message: "Login successful!",
    };
  } catch (err) {
    console.error(err);
    return {
      data: parsed.data,
      error: {
        email: ["Login failed. Invalid email or password."],
      },
      message: "Authentication error",
    };
  }
};
