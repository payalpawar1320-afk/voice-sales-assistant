import logo from "@/assets/logo.jpg";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="VoxaFlow" className="h-7 w-7 rounded-lg object-cover" />
          VoxaFlow
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 VoxaFlow. Built for field sales teams in Southeast Asia.
        </p>
      </div>
    </footer>
  );
}
