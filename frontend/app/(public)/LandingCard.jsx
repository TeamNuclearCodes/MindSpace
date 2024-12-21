import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingCard = ({ text, link, desc }) => {
  return (
    <Card className="w-[280px] h-[200px] shadow-green-glow">
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent>{desc}</CardContent>
    </Card>
  );
};

export default LandingCard;
