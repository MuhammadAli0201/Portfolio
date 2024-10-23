using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Portfolio.Bussiness.Strategies
{
    public interface ITokenStrategy
    {
        /// <summary>
        /// It will generate a token containing information against user.
        /// </summary>
        /// <param name="secretKey">A key which is used to encode the user's data</param>
        /// <param name="expiry">In how many time it will expires</param>
        public string GenerateToken(string secretKey, DateTime expiry);

        /// <summary>
        /// It will generate a token That will be used to regenerate token.
        /// </summary>
        public string GenerateRefreshToken();
    }

    public class JWTTokenStrategy : ITokenStrategy
    {
        private string Issuer { get; }
        private string Audience { get; }
        public JWTTokenStrategy(string issuer, string audience)
        {
            Issuer = issuer;
            Audience = audience;
        }

        /// <summary>
        /// It will generate a token containing information against user.
        /// </summary>
        /// <param name="secretKey">A key which is used to encode the user's data</param>
        /// <param name="expiry">In how many time it will expires</param>
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

        /// <summary>
        /// It will generate a token That will be used to regenerate token.
        /// </summary>
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
