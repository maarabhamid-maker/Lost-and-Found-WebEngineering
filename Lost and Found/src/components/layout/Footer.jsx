import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-[#001A33] border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-white">
              University Lost and Found
            </h3>
            <p className="text-slate-300 text-sm">
              Connecting lost items with their owners through technology and community.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-cyan-300">How It Works</a></li>
              <li><a href="#" className="hover:text-cyan-300">Contact Us</a></li>
              <li>
                <Link to="/faq" className="hover:text-cyan-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-cyan-300">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-300">Safety Tips</a></li>
              <li><a href="#" className="hover:text-cyan-300">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-cyan-300">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-300">Facebook</a></li>
              <li><a href="#" className="hover:text-cyan-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
          <p>&copy; 2026 University Lost and Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
