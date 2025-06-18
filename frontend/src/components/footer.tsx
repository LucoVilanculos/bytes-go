import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white font-mono px-4 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">B4F E-COMMERCE</h2>
          <p>
            B4F E-commerce is an online store specialized in selling high
            quality clothing, aimed at consumers who value style, comfort and
            sustainability.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Information</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping-returns" className="hover:underline">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:underline">
                Wholesale
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold uppercase">Social</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://www.facebook.com/" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://x.com" className="hover:underline">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4 gap-4">
          <h3 className="font-semibold uppercase">Newsletter</h3>
          <p>
            <span>Join our newsletter to stay up to date on features and releases.</span>
          </p>
          <div className="flex flex-wrap sm:flex-row items-start  gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black w-[37rem]!"
            />
            <Button className="bg-yellow-300 text-black hover:bg-yellow-400 w-[18.5rem]">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        &copy; 2025 B4F STUDENTS. All Rights Reserved.
      </div>
    </footer>
  );
};