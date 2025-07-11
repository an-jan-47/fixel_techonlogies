import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Reviews() {
  return (
    <Layout>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-fixel-pink text-fixel-pink mb-6"
            >
              Client Reviews
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-fixel-pink to-fixel-orange bg-clip-text text-transparent">
                Clients Say
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Testimonials and reviews from our satisfied clients.
            </p>
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                This page is coming soon...
              </p>
              <Button variant="outline">Back to Home</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
