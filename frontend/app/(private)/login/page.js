import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle className="text-center pb-2 border-b">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <a href="http://localhost:3001/api/auth/google">
            <Button size="lg" className="mt-10">
              Login in with Google
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
