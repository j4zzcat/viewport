import aiohttp
import json

class YourClass:
    def __init__(self):
        self.headers = {}
        self.nvrAddress = "your_nvr_address"
        self.password = "your_password"
        self.username = "your_username"

    async def retrieve(self, url, options, parse_json=True):
        async with aiohttp.ClientSession() as session:
            async with session.request(options['method'], url, headers=self.headers, data=options.get('body')) as response:
                if parse_json:
                    response.json = await response.json()
                return response

    async def logout(self):
        # Your logout logic here
        self.headers.clear()

    async def login_controller(self) -> bool:
        # If we're already logged in, we're done.
        if "Cookie" in self.headers and "X-CSRF-Token" in self.headers:
            return True

        # Acquire a CSRF token, if needed. We only need to do this if we aren't already logged in, or we don't already have a token.
        if "X-CSRF-Token" not in self.headers:
            # UniFi OS has cross-site request forgery protection built into its web management UI. We retrieve the CSRF token, if available,
            # by connecting to the Protect controller and checking the headers for it.
            response = await self.retrieve(f"https://{self.nvrAddress}", {'method': 'GET'}, False)
            if response and response.ok:
                csrf_token = response.headers.get("X-CSRF-Token")
                # Preserve the CSRF token, if found, for future API calls.
                if csrf_token:
                    self.headers["X-CSRF-Token"] = csrf_token

        # Log us in.
        response = await self.retrieve(self.get_api_endpoint("login"), {
            'method': 'POST',
            'body': json.dumps({
                'password': self.password,
                'rememberMe': True,
                'token': "",
                'username': self.username
            })
        })



        # Something went wrong with the login call, possibly a controller reboot or failure.
        if not response or not response.ok:
            await self.logout()
            return False

        # We're logged in. Let's configure our headers.
        csrf_token = response.headers.get("X-Updated-CSRF-Token") or response.headers.get("X-CSRF-Token")
        cookie = response.headers.get("Set-Cookie")

        # Save the refreshed cookie and CSRF token for future API calls and we're done.
        if csrf_token and cookie:
            # Only preserve the token element of the cookie and not the superfluous information that's been added to it.
            self.headers["Cookie"] = cookie.split(";")[0]
            # Save the CSRF token.
            self.headers["X-CSRF-Token"] = csrf_token
            return True

        # Clear out our login credentials.
        await self.logout()
        return False

    def get_api_endpoint(self, endpoint):
        # Implement this function to return the correct API endpoint URL
        return f"https://{self.nvrAddress}/api/{endpoint}"

# Example usage:
# async def main():
#     your_class_instance = YourClass()
#     success = await your_class_instance.login_controller()
#     print("Login successful:", success)

# import asyncio
# asyncio.run(main())