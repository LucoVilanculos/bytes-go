import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  alert('Sucessfully submited');
}
export function ContactPage() {
  return (

    <>
      <div className="flex justify-between py-16 font-mono bg-gray-100">
        <div>

        </div>
        <div className="">
          <section>
            <h1 className="text-3xl">CONTACT US</h1>
            <article className="text-sm mt-14 text-gray-600">
              <h1> Need to get in touch with us? Please fill out the form and </h1>
              <h1> leave us a message. Our team will get back to you within </h1>
              <h1> 1-3 business days! </h1>
            </article>
          </section>
        </div>

        <div className="flex justify-end mb-14 mr-30">
          <Card className="w-full max-w-sm shadow-none border-none bg-gray-100">  
          <CardContent className="">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email"><span className="font-bold">Name</span> <span className="text-gray-500">(required)</span></Label>
                  <Input
                    id="name"
                    type="string"
                    placeholder=""
                    required
                    className="rounded-none shadow-none border border-gray-800 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email"><span className="font-bold">Your email adress</span> <span className="text-gray-500">(required)</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    required
                    className="rounded-none shadow-none border border-gray-800 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location"><span className="font-bold">Phone Number</span> <span className="text-gray-500">(optional)</span></Label>
                  <Input
                    id="phoneNumber"
                    type="string"
                    placeholder=""
                    className="rounded-none shadow-none border border-gray-800 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location"><span className="font-bold">Location</span> <span className="text-gray-500">(optional)</span></Label>
                  <Input
                    id="location"
                    type="string"
                    placeholder=""
                    className="rounded-none shadow-none border border-gray-800 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location"><span className="font-bold">Subject</span> <span className="text-gray-500">(rerquired)</span></Label>
                  <Input
                    id="subject"
                    type="string"
                    placeholder=""
                    required

                    className="rounded-none shadow-none border border-gray-800 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message"><span className="font-bold">Description</span> <span className="text-gray-500">(rerquired)</span></Label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    cols={50}
                    placeholder=" "
                    required

                    className="border border-gray-800 py-2 px-4 rounded-0 ring-0 focus:outline-0 focus-visible:ring-0 bg-white"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer rounded-4xl bg-zinc-900 mt-4 hover:scale-105 hover:bg-zinc-900">
              Submit
            </Button>
          </CardFooter>
        </Card>
        </div>
      </div>
    </>
  )
}
