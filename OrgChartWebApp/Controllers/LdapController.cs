using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DiagramOrgApp.Models;
using DiagramOrgApp.DAL;
namespace DiagramOrgApp.Controllers
{
    public class LdapController : Controller
    {
        private DozzierOCEntities db = new DozzierOCEntities();

        [HttpPost]
        public JsonResult ValidateLdapUser(string user)
        {
            Boolean userExists = false;
            SearchResultCollection sResults = null;
            string path = "LDAP://Falabella.com";
            string criterios = "(&(objectClass=user)(samAccountName=" + user + "))";
            try
            {
                DirectoryEntry dEntry = new DirectoryEntry(path);
                DirectorySearcher dSearcher = new DirectorySearcher(dEntry);
                dSearcher.Filter = criterios;
                sResults = dSearcher.FindAll();
                int result = sResults.Count;
                if (result >= 1)
                {
                    userExists = true;
                }
                else
                {
                    userExists = false;
                }
            }
            catch (Exception ex)
            {
                return Json(userExists, JsonRequestBehavior.AllowGet);
            }
            return Json(userExists, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetLDAPUsersxId(int IdDirectorio)
        {                  
            List<LdapUsers> listaUsuarios = new List<LdapUsers>();
            try
            {                
                Directorio directorio = db.Directorio.Find(IdDirectorio);
                string Server = directorio.cadenaConexion;
                string User = directorio.usuarioConexion;
                string Password = directorio.claveConexion;
                
                DirectoryEntry dEntry = new DirectoryEntry(Server, User, Password, AuthenticationTypes.ServerBind);
                DirectorySearcher dSearcher = new DirectorySearcher(dEntry);
                //dSearcher.Filter = criterios;
                foreach (SearchResult result in dSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetDirectoryEntry() as DirectoryEntry;
                    listaUsuarios.Add(new LdapUsers()
                    {
                        Apellido = de.Properties["ou"].Value.ToString(),
                        PrimerNombre = de.Properties["ou"].Value.ToString(),
                        PrincipalName = de.Properties["cn"].Value.ToString(),
                        UserName = de.Properties["cn"].Value.ToString()
                    });
                }

                dEntry.Dispose();
                dSearcher.Dispose();
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            return Json(listaUsuarios, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetLDAPUsers()
        {
            //string path = "ldap://localhost:389/dc=example,dc=com";
            //string path = "ldap://localhost:389/cn=Manager,dc=example,dc=com";

            ////forum
            //string domain = "ldap://ldap.forumsys.com/ou=mathematicians";
            //string username = "cn=read-only-admin,dc=example,dc=com";
            //string password = "password";
            //string path = "Ldap://ldap.forumsys.com:389/ou=scientists,dc=example,dc=com";
            //string domainAndUsername = domain + @"/" + username;
            ////forum

            ////local
            //string domain = "ldap://localhost:389/ou=usuarios";
            //string username = "cn=luis,ou=usuarios,dc=example,dc=com";
            //string password = "secret";
            //string path = "Ldap://ldap.forumsys.com:389/ou=usuarios,dc=example,dc=com";
            //string domainAndUsername = domain + @"\" + username;
            ////local
            ///
            string ldapServer = System.Web.Configuration.WebConfigurationManager.AppSettings["LDAP_Server"].ToString();
            string userName = System.Web.Configuration.WebConfigurationManager.AppSettings["LDAP_UserName"].ToString();
            string password = System.Web.Configuration.WebConfigurationManager.AppSettings["LDAP_Password"].ToString();


            List<LdapUsers> listaUsuarios = new List<LdapUsers>();
            try
            {

                //DirectoryEntry dEntry = new DirectoryEntry(path, domainAndUsername, password);
                //DirectoryEntry dEntry = new DirectoryEntry(path, "cn=luis,ou=usuarios,dc=example,dc=com", "secret");
                DirectoryEntry dEntry = new DirectoryEntry(ldapServer, userName, password, AuthenticationTypes.ServerBind);
                DirectorySearcher dSearcher = new DirectorySearcher(dEntry);
                //dSearcher.Filter = criterios;
                foreach (SearchResult result in dSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetDirectoryEntry() as DirectoryEntry;
                    listaUsuarios.Add(new LdapUsers()
                    {
                        //Apellido = de.Properties["sn"].Value.ToString(),
                        //PrimerNombre = de.Properties["givenName"].Value.ToString(),
                        //PrincipalName = de.Properties["userPrincipalName"].Value.ToString(),
                        //UserName = de.Properties["samAccountName"].Value.ToString()

                        Apellido = de.Properties["ou"].Value.ToString(),
                        PrimerNombre = de.Properties["ou"].Value.ToString(),
                        PrincipalName = de.Properties["cn"].Value.ToString(),
                        UserName = de.Properties["cn"].Value.ToString()
                    });
                }

                dEntry.Dispose();
                dSearcher.Dispose();
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            return Json(listaUsuarios, JsonRequestBehavior.AllowGet);
        }
    }
}