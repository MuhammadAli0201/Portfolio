using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Portfolio.Bussiness.Strategies
{
    public interface ITokenService
    {
        public string GenerateToken(string secretKey, DateTime expiry);

        public string GenerateRefreshToken();
    }

    public class JWTTokenService : ITokenService
    {
        private string Issuer { get; }
        private string Audience { get; }
        public JWTTokenService(string issuer, string audience)
        {
            Issuer = issuer;
            Audience = audience;
        }

        public string GenerateToken(string secretKey, DateTime expiry)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "username"),
                }),
                Expires = expiry,
                Issuer = this.Issuer,
                Audience = this.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
