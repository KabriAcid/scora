import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Spinner component
const Spinner = () => (
    <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
    </div>
);

interface ForgotPasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (email: string) => Promise<void>;
}

const ForgotPasswordModal = ({
    open,
    onOpenChange,
    onSubmit,
}: ForgotPasswordModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (data: ForgotPasswordFormValues) => {
        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(data.email);
            } else {
                // Default behavior if no callback provided
                console.log("Forgot password request:", data);
                await new Promise((resolve) => setTimeout(resolve, 1500));
            }

            onOpenChange(false);
            form.reset();
        } catch (error) {
            console.error("Forgot password error:", error);
            form.setError("root", {
                message: "Failed to send reset email. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="backdrop-blur-md bg-card/95 border-accent/20">
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter your email address and we'll send you a link to reset your
                        password.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        {/* Error message */}
                        {form.formState.errors.root && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                            >
                                {form.formState.errors.root.message}
                            </motion.div>
                        )}

                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="forgot-email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="forgot-email"
                                                placeholder="agent@scora.ng"
                                                type="email"
                                                disabled={isLoading}
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                onClick={() => {
                                    onOpenChange(false);
                                    form.reset();
                                }}
                                className="flex-1 border-accent/20"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner />
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ForgotPasswordModal;
