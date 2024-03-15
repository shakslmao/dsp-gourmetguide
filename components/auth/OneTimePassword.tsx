"use client";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const OneTimePasswordPage = () => {
    return (
        <div>
            <InputOTP
                maxLength={6}
                render={({ slots }: any) => (
                    <>
                        <InputOTPGroup>
                            {slots.slice(0, 3).map(({ slot, index }: any) => (
                                <InputOTPSlot
                                    key={index}
                                    {...slot}
                                />
                            ))}{" "}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            {slots.slice(3).map(({ slot, index }: any) => (
                                <InputOTPSlot
                                    key={index + 3}
                                    {...slot}
                                />
                            ))}
                        </InputOTPGroup>
                    </>
                )}
            />
        </div>
    );
};

export default OneTimePasswordPage;
