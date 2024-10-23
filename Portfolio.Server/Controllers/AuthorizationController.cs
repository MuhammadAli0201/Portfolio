using Microsoft.AspNetCore.Authorization;
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
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthorizationController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<AuthorizationController> logger
            )
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        /// <summary>
        /// Used Create a role to user.
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <returns>Conflict if role already exist</returns>
        /// <returns>Success if role is created</returns>
        /// <returns>BadRequest if any error occured is creation</returns>
        [HttpPost(nameof(CreateRole))]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (roleName.IsNullOrEmpty())
            {
                return Forbid("role name is required");
            }

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

        /// <summary>
        /// Used Assign a role to user.
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <param name="userId">unique id of a user</param>
        /// <returns>BadRequest if failed to assign user</returns>
        /// <returns>Success if role is assigned to user</returns>
        /// <returns>NotFound if user doesn't exist or role doesn't exist</returns>
        [HttpPost(nameof(AssignRoleToUser))]
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

        /// <summary>
        /// Used Remove a user from a role.
        /// </summary>
        /// <param name="userId">user unique id</param>
        /// <param name="roleName">role name</param>
        /// <returns>BadRequest if failed to remove user from a role</returns>
        /// <returns>Success if role is removed to user</returns>
        /// <returns>NotFound if user doesn't exist or role doesn't exist</returns>
        [HttpPost(nameof(RemoveUserFrom))]
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

        /// <summary>
        /// Used Remove a user from a role.
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <returns>BadRequest if failed to delete user</returns>
        /// <returns>Success if role is deleted</returns>
        /// <returns>NotFound if role doesn't exist</returns>
        [HttpDelete(nameof(DeleteRole))]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null) return NotFound($"Oops. Role '{roleName}' not found.");

            var result = await _roleManager.DeleteAsync(role);

            if (result.Succeeded) return Ok(roleName);

            else return BadRequest("Oops. Failed to remove role.");

        }

        /// <summary>
        /// Used to get all roles.
        /// </summary>
        /// <returns>Success. return all roles</returns>
        [HttpGet(nameof(GetAllRoles))]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        /// <summary>
        /// Used To get all user against a role.
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <returns>Success. return all Users</returns>
        /// <returns>NotFounf.If role not found</returns>
        [HttpGet(nameof(GetUsersAgainstRole))]
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

        /// <summary>
        /// Used To get all roles against user using his id.
        /// </summary>
        /// <param name="userId">role name</param>
        /// <returns>Success. return roles</returns>
        /// <returns>NotFound.If user not found</returns>
        [HttpGet(nameof(GetRolesAgainstUser))]
        public async Task<IActionResult> GetRolesAgainstUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Oops. User against '{userId}' not found.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        /// <summary>
        /// Used to update user against roles.
        /// </summary>
        /// <param name="userId">role name</param>
        /// <param name="appRoleNames">all role name</param>
        /// <returns>Success. return User with updated role</returns>
        /// <returns>Conflict.If a user is already in roles and there is no new changes</returns>
        /// <returns>Not Found.If user is not Found.</returns>
        [HttpPost(nameof(UpdateUserRole))]
        public async Task<IActionResult> UpdateUserRole(string userId, List<string> appRoleNames)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Oops. User not found.");
            }

            List<string> userUpdatedInRoles = new List<string> { };

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
