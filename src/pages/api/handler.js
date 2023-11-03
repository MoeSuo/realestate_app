export default function handler(request, response) {
    // Use 308 for a permanent redirect, 307 for a temporary redirect
    return response.redirect(307, '/');
  }