import React from "react";

export default function Input() {
  return (
    <form className="flex items-center space-x-4 pt-4 w-full" action="/submit" method="post">
  <input
    className="text-gray-200 bg-gray-600 rounded-lg p-3 w-full"
    type="url"
    id="link"
    name="link"
    placeholder="https://..."
    required
  />
  <button
    className="bg-blue-200 hover:bg-gray-600 hover:text-blue-200 text-gray-600 rounded-lg p-3 w-1/4"
    type="submit"
  >
    Generate
  </button>
</form>

  );
}
