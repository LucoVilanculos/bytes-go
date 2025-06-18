import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  alert('Successfully submitted');
};

export function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 ">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl p-4"
      >
        {/* Texto de contato */}
        <section className="flex-1 max-w-md text-white">
          <h1 className="text-3xl font-bold mb-6">CONTACT US</h1>
          <article className="text-base mt-6 text-blue-100">
            <p>Need to get in touch with us? Please fill out the form and leave us a message.</p>
            <p>Our team will get back to you within 1-3 business days!</p>
          </article>
        </section>

        {/* Formulário */}
        <Card className="w-full max-w-md shadow-2xl border-none bg-white/90">
          <CardContent>
            <form onSubmit={handleSubmit} className="py-4">
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    <span className="font-bold">Name</span> <span className="text-gray-500">(required)</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <span className="font-bold">Your email address</span> <span className="text-gray-500">(required)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">
                    <span className="font-bold">Phone Number</span> <span className="text-gray-500">(optional)</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">
                    <span className="font-bold">Location</span> <span className="text-gray-500">(optional)</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">
                    <span className="font-bold">Subject</span> <span className="text-gray-500">(required)</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">
                    <span className="font-bold">Description</span> <span className="text-gray-500">(required)</span>
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white py-2 px-4"
                  />
                </div>
              </div>
              <CardFooter className="flex-col gap-2 px-0">
                <Button
                  type="submit"
                  className="w-full mt-6 rounded-full bg-blue-900 text-white font-semibold hover:scale-105 hover:bg-blue-800 transition"
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
