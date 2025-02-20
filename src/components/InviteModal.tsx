"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { API_CONFIG } from "../config/api";

interface InviteFormData {
  fullName: string;
  email: string;
  confirmEmail: string;
}

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
    reset,
  } = useForm<InviteFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: InviteFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(API_CONFIG.INVITE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "Something went wrong");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowError = (fieldName: keyof InviteFormData) => {
    return !!(touchedFields[fieldName] && errors[fieldName]);
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>All done!</DialogTitle>
        <DialogContent>
          <Typography>
            You will be one of the first to experience Broccoli & Co. when we
            launch.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "24px",
          }}
        >
          <Button
            onClick={() => {
              onClose();
              setIsSuccess(false);
            }}
            variant="contained"
            fullWidth
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request an invite</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
              })}
              label="Full name"
              error={shouldShowError("fullName")}
              helperText={
                shouldShowError("fullName") && errors.fullName?.message
              }
              fullWidth
            />

            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              label="Email"
              type="email"
              error={shouldShowError("email")}
              helperText={shouldShowError("email") && errors.email?.message}
              fullWidth
            />

            <TextField
              {...register("confirmEmail", {
                required: "Please confirm your email",
                validate: (value) =>
                  value === watch("email") || "Emails do not match",
              })}
              label="Confirm email"
              type="email"
              error={shouldShowError("confirmEmail")}
              helperText={
                shouldShowError("confirmEmail") && errors.confirmEmail?.message
              }
              fullWidth
            />

            {submitError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {submitError}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "24px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Sending, please wait..." : "Send"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
