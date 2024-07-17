using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft;

public class JwtGenerator
{
    public static string GenerateJwt(string key, List<Claim> claims)
    {
        
        var header = new { alg = "HS512", typ = "JWT" };
        var headerJson = Newtonsoft.Json.JsonConvert.SerializeObject(header);
        var encodedHeader = Base64UrlEncode(Encoding.UTF8.GetBytes(headerJson));

        
        var payload = new Dictionary<string, object>();
        foreach (var claim in claims)
        {
            payload[claim.Type] = claim.Value;
        }
        payload["exp"] = DateTimeOffset.UtcNow.AddDays(1).ToUnixTimeSeconds(); 

        var payloadJson = Newtonsoft.Json.JsonConvert.SerializeObject(payload);
        var encodedPayload = Base64UrlEncode(Encoding.UTF8.GetBytes(payloadJson));

        
        var signatureInput = $"{encodedHeader}.{encodedPayload}";

        
        var keyBytes = Convert.FromBase64String(key);
        var signingKey = new SymmetricSecurityKey(keyBytes);

        
        var signature = ComputeHmacSha512(signatureInput, signingKey);
        var encodedSignature = Base64UrlEncode(signature);

        
        var jwt = $"{signatureInput}.{encodedSignature}";
        return jwt;
    }

    private static byte[] ComputeHmacSha512(string text, SymmetricSecurityKey key)
    {
        using (var hmac = new HMACSHA512(key.Key))
        {
            return hmac.ComputeHash(Encoding.UTF8.GetBytes(text));
        }
    }

    private static string Base64UrlEncode(byte[] bytes)
    {
        return Convert.ToBase64String(bytes)
            .TrimEnd('=')
            .Replace('+', '-')
            .Replace('/', '_');
    }
    public static bool ValidateToken(string token, string key)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var keyBytes = Convert.FromBase64String(key);

    try
    {
        tokenHandler.ValidateToken(token, new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(5)
        }, out SecurityToken validatedToken);

        return true;
    }
    catch
    {
        return false;
    }
}


}

    
