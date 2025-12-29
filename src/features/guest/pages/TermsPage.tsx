import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const TermsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-6 text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            Welcome to Scora, a live football scoring platform for Nigerian
                            local leagues. These Terms of Service govern your access to and
                            use of our platform. By accessing or using Scora, you agree to be
                            bound by these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            2. User Responsibilities
                        </h2>
                        <p className="text-muted-foreground">
                            As a user of Scora, you agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Provide accurate and truthful information</li>
                            <li>
                                Maintain the confidentiality of your account credentials
                            </li>
                            <li>Use the platform in compliance with all applicable laws</li>
                            <li>Not engage in any unauthorized access or misuse</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Agent Requirements</h2>
                        <p className="text-muted-foreground">
                            Live agents must:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Be physically present at assigned match venues</li>
                            <li>Log accurate match events in real-time</li>
                            <li>
                                Follow all data entry guidelines and verification procedures
                            </li>
                            <li>Maintain professional conduct at all times</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            4. Limitation of Liability
                        </h2>
                        <p className="text-muted-foreground">
                            Scora is provided "as is" without warranties of any kind. We are
                            not liable for any indirect, incidental, or consequential damages
                            arising from your use of the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to modify these terms at any time. Continued
                            use of the platform constitutes your acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                        <p className="text-muted-foreground">
                            For questions about these Terms of Service, please contact us at
                            support@scora.ng
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
