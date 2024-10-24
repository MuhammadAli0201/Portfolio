using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Models.Models;

namespace Portfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthorizationController(UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (roleName.IsNullOrEmpty()) return Forbid("role name is required");

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                var result = await _roleManager.CreateAsync(new IdentityRole { Name = roleName });
                if (result.Succeeded) return Ok(roleName);
                else return BadRequest("Oops. Failed to create role. \n");
            }
            else
            {
                return Conflict($"Oops. Role '{roleName}' already exists.");
            }
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignRoleToUser(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Oops. User Not Found.");

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists) return NotFound($"Oops. Role '{roleName}' not found.");

            var userAgainstRole = await _userManager.GetUsersInRoleAsync(roleName);
            if (userAgainstRole.Where(u => u.Id == user.Id).FirstOrDefault() != null)
                return Conflict($"Oops. user is already assigned against {roleName}.");


            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded) return Ok(userId);
            else return BadRequest("Opps. Failed to assign role.");
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveUserFrom(string userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Oops. User not found.");


            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists) return NotFound($"Oops. Role '{roleName}' not found.");

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (result.Succeeded) return Ok(userId);
            else return BadRequest("Oops. Failed to remove role.");

        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null) return NotFound($"Oops. Role '{roleName}' not found.");

            var result = await _roleManager.DeleteAsync(role);

            if (result.Succeeded) return Ok(roleName);

            else return BadRequest("Oops. Failed to remove role.");

        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpGet("get-user-by-role")]
        public async Task<IActionResult> GetUsersAgainstRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound($"Oops. Role '{roleName}' not found.");
            }

            var users = await _userManager.GetUsersInRoleAsync(roleName);
            return Ok(users);
        }

        [HttpGet("get-role-by-user")]
        public async Task<IActionResult> GetRolesAgainstUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound($"Oops. User against '{userId}' not found.");

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        [HttpPost("update-user-role")]
        public async Task<IActionResult> UpdateUserRole(string userId, List<string> appRoleNames)
        {
            List<string> userUpdatedInRoles = new List<string> { };
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound($"Oops. User not found.");

            var rolesAgainstUser = await _userManager.GetRolesAsync(user);
            var uniqueRoles = rolesAgainstUser.Except(appRoleNames).Union(appRoleNames.Except(rolesAgainstUser));
            if (uniqueRoles == null)
            {
                return Conflict("User are already in roles. Add or remove a role to proceed.");
            }

            if (uniqueRoles != null)
            {
                foreach (var roleName in uniqueRoles)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    if (role != null)
                    {
                        var userAgainstRole = await _userManager.GetUsersInRoleAsync(role.Name);
                        if (userAgainstRole.Where(u => u.Id == userId).FirstOrDefault() == null)
                        {
                            var added = await _userManager.AddToRoleAsync(user, role.Name);
                            if (added.Succeeded)
                            {
                                userUpdatedInRoles.Add(role.Name);
                            }
                        }
                        else
                        {
                            var removed = await _userManager.RemoveFromRoleAsync(user, role.Name);
                            if (removed.Succeeded)
                            {
                                userUpdatedInRoles.Add(role.Name);
                            }
                        }
                    }
                }
            }
            return Ok(userUpdatedInRoles);
        }
    }
}
