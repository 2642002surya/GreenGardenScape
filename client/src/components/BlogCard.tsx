import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  onClick?: () => void;
}

export default function BlogCard({
  id,
  image,
  title,
  excerpt,
  date,
  readTime,
  onClick
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all cursor-pointer" onClick={onClick} data-testid={`card-blog-${id}`}>
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1" data-testid={`text-date-${id}`}>
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          <span data-testid={`text-read-time-${id}`}>{readTime}</span>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2" data-testid={`text-blog-title-${id}`}>
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3" data-testid={`text-blog-excerpt-${id}`}>
            {excerpt}
          </p>
        </div>

        <Button variant="ghost" className="group" data-testid={`button-read-more-${id}`}>
          Read More
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}
