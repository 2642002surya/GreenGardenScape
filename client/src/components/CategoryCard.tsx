import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export default function CategoryCard({ icon: Icon, title, onClick }: CategoryCardProps) {
  return (
    <Card
      className="p-6 text-center cursor-pointer hover-elevate active-elevate-2 transition-all"
      onClick={onClick}
      data-testid={`card-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-lg" data-testid={`text-category-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
      </div>
    </Card>
  );
}
