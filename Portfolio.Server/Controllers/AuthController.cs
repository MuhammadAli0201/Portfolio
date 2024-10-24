using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Bussiness.Strategies;
using Portfolio.Models.DTOs;
using Portfolio.Models.Models;


namespace Portfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
            )
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(AppUserDTO appUser)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _userManager.FindByEmailAsync(appUser.Email);
            if (result != null) return Conflict("Oops. User Already Exist.");

            var userResult = await _userManager.CreateAsync(appUser, appUser.Password);
            if (userResult.Succeeded)
            {
                var createdUser = await _userManager.FindByEmailAsync(appUser.Email);
                
                var roleExists = await _roleManager.RoleExistsAsync("User");
                if (!roleExists) return Ok(createdUser);                

                var resultRole = await _userManager.AddToRoleAsync(createdUser, "User");
                if (resultRole.Succeeded) return Ok(createdUser);
                else return BadRequest("Oops. User Created but failed to assign role.");
            }
            else
            {
                return BadRequest("OOps! Unable to create user. This might be because of password strength or wrong email format.");
            }

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser user = await _userManager.FindByEmailAsync(userLoginDTO.Email);

            if (user == null) return NotFound("Oops. Error In Credentials. please try again.");
            
            var result = await _signInManager.PasswordSignInAsync(user, userLoginDTO.Password, false, false);
            if (result.Succeeded)
            {
                var jwtSettings = _configuration.GetSection("JwtSettings");
                var issuer = jwtSettings["Issuer"];
                var audience = jwtSettings["Audience"];
                var secretKey = jwtSettings["SecretKey"];

                ITokenService jwtToken = new JWTTokenService(issuer, audience);
                string token = jwtToken.GenerateToken(secretKey, DateTime.Now.AddHours(1));
                if (token.IsNullOrEmpty())
                   return BadRequest("Oops. Unable to generate token for you. Please try again later.");
                
                string refreshToken = jwtToken.GenerateRefreshToken();
                if (refreshToken.IsNullOrEmpty())                
                    return BadRequest("Oops. Unable to generate refresh token for you. Please try again later.");                

                user.RefreshToken = refreshToken;
                var updateSuccess = await _userManager.UpdateAsync(user);
                if (!updateSuccess.Succeeded)
                    return BadRequest("Oops. Something Unexpected Occurs. Please try later.");
                
                return Ok(new {
                    AccessToken = token,
                    RefreshToken = refreshToken,
                    AppUser = user,
                });
            }
            else
            {
                return BadRequest("Oops. Error In Credentials. please try again.");
            }
        }

        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(string userId, string oldPassword, string newPassword)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Oops. User Not Found.");
            
            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, oldPassword, false);
            if (!signInResult.Succeeded) return BadRequest("Oops. Old Password is Incorrect.");
            
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            if (result.Succeeded) return Ok(newPassword);            
            else return BadRequest("Oops. Something unexpected occurs while updating password.");            
        }

        [AllowAnonymous]
        [HttpGet("username/{userName}")]
        public async Task<IActionResult> IsUsernameExist(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null) return Ok(false);
            else return Ok(true);
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser(AppUser appUser)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
           
            var user = await _userManager.FindByIdAsync(appUser.Id);
            if (user == null) return NotFound("Oops. User Not Found.");            
           
            user.Name = appUser.Name;
            user.PhoneNumber = appUser.PhoneNumber;
            user.DisplayPicture = appUser.DisplayPicture;
            user.DisplayText = appUser.DisplayText;
            user.DisplayDescription = appUser.DisplayDescription;
            var userUpdatedResult = await _userManager.UpdateAsync(user);
            if (userUpdatedResult.Succeeded) return Ok(appUser);
            
            return BadRequest("Oops. Something unexpected occurs. Failed to update user.");            
        }

        //[Authorize(Policy = "AllUsers")]
        //[HttpPut(nameof(AddUserAddress))]
        //public async Task<IActionResult> AddUserAddress(UserAddressDTO userAddressDTO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _logger.LogInformation("Checking for user existance.");
        //    var user = await _userManager.FindByIdAsync(userAddressDTO.UserId);
        //    if (user == null)
        //    {
        //        _logger.LogInformation("Oops. User Not found.");
        //        return NotFound("Oops. User Not Found.");
        //    }
        //    _logger.LogInformation("adding user address.");

        //    UserAddress address = new UserAddress();
        //    address = userAddressDTO.DTOToModel();
        //    var result = await _manageUserAddressService.AddAsync(address);
        //    if (result != null)
        //    {
        //        return Ok(new ResponseDTO<UserAddressDTO>
        //        {
        //            Message = "User address Added Successfully.",
        //            Obj = userAddressDTO
        //        });
        //    }
        //    else
        //    {
        //        return BadRequest("Oops. Something unexpected occurs. Failed to add user address.");
        //    }
        //}
    }
}
