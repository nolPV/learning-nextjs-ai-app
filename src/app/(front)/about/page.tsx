import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "เกี่ยวกับเรา | CafeBlend",
  description: "เรื่องราวการเดินทางของความหลงใหลในรสชาติกาแฟที่อบอุ่น",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-primary">
              เรื่องราวของเรา
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border w-12" />
              <span className="text-secondary font-serif italic text-xl">Since 1998</span>
              <div className="h-px bg-border w-12" />
            </div>
            <p className="text-foreground max-w-2xl mx-auto text-lg leading-relaxed italic">
              "มากกว่าแค่รสชาติ แต่คือความทรงจำที่ถูกรินลงในถ้วยกาแฟ"
            </p>
          </div>

          {/* Our Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-serif text-primary">จุดเริ่มต้นของ CafeBlend</h2>
              <p className="text-foreground leading-relaxed">
                CafeBlend เริ่มต้นจากความฝันเล็กๆ ในห้องครัวที่อบอวลไปด้วยกลิ่นคั่วกาแฟ 
                เราเชื่อว่ากาแฟหนึ่งแก้วสามารถเปลี่ยนวันธรรมดาให้เป็นวันที่พิเศษได้ 
                จากการทดลองผสมผสานเมล็ดกาแฟสายพันธุ์ต่างๆ จากทั่วทุกมุมโลก 
                เราจึงมุ่งมั่นที่จะสร้างสรรค์ "รสชาติที่สมดุล" หรือ Blend ที่ลงตัวที่สุดสำหรับทุกคน
              </p>
              <p className="text-foreground leading-relaxed">
                ตลอดระยะเวลากว่า 25 ปี เราไม่เคยหยุดพัฒนาและเดินทางไปค้นหาแหล่งปลูกกาแฟที่ดีที่สุด 
                เพื่อให้มั่นใจว่าทุกหยดที่คุณดื่ม คือความใส่ใจตั้งแต่ต้นน้ำจนถึงปลายถ้วย
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square bg-card shadow-raised rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="w-full h-full flex items-center justify-center text-muted-foreground italic p-8 text-center">
                   [ ภาพบรรยากาศร้านวันแรกที่มีความอบอุ่นและคลาสสิก ]
                </div>
              </div>
            </div>
          </div>

          {/* Founder Profile Section */}
          <div className="mb-24 bg-card shadow-raised rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-48 h-48 rounded-full bg-muted shadow-inset flex-shrink-0 overflow-hidden border-4 border-white">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-center p-4 italic">
                   [ ภาพผู้ก่อตั้ง ]
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-serif text-primary">ผู้ก่อตั้งของเรา</h2>
                <div className="space-y-4">
                  <p className="text-xl font-medium text-foreground">คุณธนัท กาแฟดี (Tanat Kafeedee)</p>
                  <p className="text-foreground leading-relaxed">
                    จากผู้เชี่ยวชาญด้านเมล็ดกาแฟ (Q Grader) ที่ใช้เวลาเกือบทั้งชีวิตในการเดินทาง 
                    สำรวจไร่กาแฟในเอธิโอเปีย บราซิล และไทย คุณธนัทนำเอาความหลงใหลในศาสตร์ของกาแฟ 
                    มาถ่ายทอดผ่านการคัดสรรเมล็ดกาแฟพิเศษ (Specialty Coffee) 
                    และสร้างวัฒนธรรมการดื่มกาแฟที่เน้นความประณีตแต่เข้าถึงได้
                  </p>
                  <p className="text-foreground leading-relaxed">
                    "ผมไม่ได้อยากขายแค่กาแฟ แต่ผมอยากแบ่งปันเรื่องราวของเกษตรกร 
                    และความตั้งใจที่ส่งผ่านเมล็ดกาแฟแต่ละเมล็ดมาถึงคุณ"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-serif text-center text-primary mb-12">หัวใจของ CafeBlend</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "คุณภาพสูงสุด",
                  desc: "เราคัดสรรเฉพาะเมล็ดกาแฟเกรด Specialty ที่ผ่านการทดสอบรสชาติอย่างเข้มงวด",
                  icon: "✨"
                },
                {
                  title: "ความยั่งยืน",
                  desc: "สนับสนุนเกษตรกรท้องถิ่นด้วยการค้าที่เป็นธรรม (Fair Trade) เพื่อการเติบโตร่วมกัน",
                  icon: "🌱"
                },
                {
                  title: "ความอบอุ่น",
                  desc: "เราออกแบบทุกประสบการณ์ให้ลูกค้ารู้สึกเหมือนได้ดื่มกาแฟที่บ้านเพื่อนสนิท",
                  icon: "🏠"
                }
              ].map((value, i) => (
                <div key={i} className="bg-card shadow-raised p-8 rounded-xl text-center space-y-4 hover:translate-y-[-4px] transition-transform">
                  <div className="text-4xl mb-2">{value.icon}</div>
                  <h3 className="text-xl font-medium text-primary">{value.title}</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8 py-12">
            <p className="text-lg text-foreground italic">
              อยากสัมผัสรสชาติที่ลงตัวที่สุดของเราไหม?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/product">
                <Button className="px-8 h-12 rounded-md bg-primary text-white hover:bg-primary/90 shadow-raised">
                  เลือกซื้อเมล็ดกาแฟ
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 h-12 rounded-md border-border text-primary hover:bg-accent">
                  ติดต่อสอบถาม
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
