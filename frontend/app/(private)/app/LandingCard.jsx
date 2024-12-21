import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const LandingCard = ({ text, link, desc }) => {
  return (
    <Link href={link}>
      <Card className="w-[280px] h-[200px] shadow-green-glow">
        <CardHeader>
          <CardTitle>{text}</CardTitle>
        </CardHeader>
        <CardContent>
          {desc}
        </CardContent>
      </Card>
    </Link>
  );
};

export default LandingCard;
