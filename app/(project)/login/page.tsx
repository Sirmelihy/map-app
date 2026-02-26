"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const supabase = createClient();

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        debugger;

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                setError(error.message)
            }

            router.push("/admin");
            router.refresh();

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="px-4">
                <Card className="w-full max-w-md p-8 bg-accent">
                    <h1 className="text-2xl font-bold text-center">Giriş Yap</h1>
                    <p className="text-center text-muted-foreground">Sisteme giriş yapmak için lütfen kullanıcı adınızı ve şifrenizi girin.</p>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                        <Input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit">{isLoading ? "Yükleniyor..." : "Giriş Yap"}</Button>
                    </form>
                </Card>
                <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className="w-full mt-4 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-4 mr-2" />
                    Anasayfaya Dön
                </Button>
            </div>

        </div>
    )
}