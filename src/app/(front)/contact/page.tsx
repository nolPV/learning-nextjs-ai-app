import ContactForm from "./contact-form";

export const metadata = {
  title: "ติดต่อเรา | CafeBlend",
  description: "ส่งข้อความหาเราเพื่อเริ่มต้นบทสนทนาที่อบอุ่น",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl mb-4">
              ติดต่อเรา
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              เรายินดีตอบทุกข้อสงสัยและคำแนะนำของคุณ ทีมงาน CafeBlend จะติดต่อกลับโดยเร็วที่สุดเพื่อให้คุณได้รับประสบการณ์การดื่มกาแฟที่สมบูรณ์แบบ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-7.86 4-4.14 0z"/><path d="M12 12L2.84 7 1.2 4a2 2 0 0 1-2 2v12a2 2 0 0 1 2 2h20a2 2 0 0 1 2-2v-4.8l-4.16-4.16z"/></svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <p className="text-sm text-foreground">hello@cafeblend.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2.82l-2.33-2.33a2.11 2.11 0 0 0-1.14 0l-2.33 2.33A2 2 0 0 1 12 19.92V12a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v7.92a2 2 0 0 1-2.18 2.82l-2.33-2.33a2.11 2.11 0 0 0-1.14 0l-2.33 2.33A2 2 0 0 1 0 16.92V12a2 2 0 0 0 2-2h1a2 2 0 0 0 2 2v7.92z"/></svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">เบอร์โทรศัพท์</p>
                    <p className="text-sm text-foreground">02-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 12"/></svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary">เวลาทำการ</p>
                    <p className="text-sm text-foreground">จันทร์ - ศุกร์: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="h-px bg-border w-full" />
              </div>
              <p className="text-foreground text-sm leading-relaxed italic">
                "กาแฟที่ดีเริ่มต้นด้วยบทสนทนาที่อบอุ่น" <br />
                หากคุณมีคำถามหรือต้องการคำแนะนำเกี่ยวกับเมล็ดกาแฟพิเศษของเรา สามารถส่งข้อความหาเราได้เลยครับ
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
