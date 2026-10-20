import { toast } from "sonner";

export async function copyEmail(
  email: string,
  navigate: (url: string) => void = (url) => window.location.assign(url),
): Promise<boolean> {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(email);
    toast.success("Email copied");
    return true;
  } catch {
    navigate(`mailto:${email}`);
    return false;
  }
}
