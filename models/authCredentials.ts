interface authCredentials {
  access_token: String;
  refresh_token: String;
  email_verified: Boolean;
  email: String;
  uid: String;
  photo_url: String;
  api_key: String;
  display_name: String;
  phone_number: String;
  expirationTime: String;
}

export default authCredentials;
