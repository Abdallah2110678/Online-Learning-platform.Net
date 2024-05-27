using System;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;

        public AccountController(
            UserManager<User> userManager,
            ITokenService tokenService,
            SignInManager<User> signInManager
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register registerDto)
        {
            try
            {
                var user = new User
                {
                    FName = registerDto.FName,
                    LName = registerDto.LName,
                    DOB = registerDto.DOB ?? DateTime.MinValue,
                    Gender = registerDto.Gender,
                    Phone = registerDto.Phone.ToString() ?? string.Empty,
                    Email = registerDto.Email,
                    Role = registerDto.Role,
                    UserName=registerDto.Email,
                    
                };
                var result = await _userManager.CreateAsync(user, registerDto.Password);
                if (result.Succeeded)
                {
                    var token = await _tokenService.CreateToken(user);
                    return Ok(
                        new NewUser
                        {
                            Id = user.Id,
                            Email = user.Email,
                            Token = token,
                        }
                    );
                }
                else
                {
                    var errors = result.Errors.Select(e => new { e.Code, e.Description });
                    return BadRequest(new { Errors = errors });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x =>
                x.UserName == loginDto.Email.ToLower()
            );
            if (user == null)
                return Unauthorized("The user was not found");

            var result = await _signInManager.CheckPasswordSignInAsync(
                user,
                loginDto.Password,
                false
            );
            if (!result.Succeeded)
                return Unauthorized("Invalid username and/or password");

            // var roles = await _userManager.GetRolesAsync(user);
            // var role = roles.Count > 0 ? roles[0] : string.Empty;

            return Ok(
                new NewUser
                {
                    Email = user.Email,
                    // Role = role,
                    // isAdmin = role == "Admin",
                    // Id = user.Id,
                    Token = await _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("User logged out successfully");
        }
    }
}
