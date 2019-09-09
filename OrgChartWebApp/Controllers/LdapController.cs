using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DiagramOrgApp.Models;
using DiagramOrgApp.DAL;
using Microsoft.Win32;

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
                string User = directorio.campoConfig1;
                string Password = directorio.campoConfig2;
                
                DirectoryEntry dEntry = new DirectoryEntry(Server, User, Password, AuthenticationTypes.ServerBind);
                DirectorySearcher dSearcher = new DirectorySearcher(dEntry);
                //dSearcher.Filter = criterios;
                foreach (SearchResult result in dSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetDirectoryEntry() as DirectoryEntry;
                    listaUsuarios.Add(new LdapUsers()
                    {
                        Email = de.Properties["ou"].Value.ToString(),
                        Name = de.Properties["ou"].Value.ToString(),
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

  
        private  JsonResult GetUsersLDAP(Directorio directorio)
        {
            List<LdapUsers> listaUsuarios = new List<LdapUsers>();
            try
            {
                string SectorLlaves = directorio.campoConfig1;
                string RutaLlaves = directorio.campoConfig2.Replace("\\", @"\");
                string Llave = directorio.cadenaConexion;
                string ValorLLave = "";
                RegistryKey rkPathRegistry = null;
                RegistryKey rkValue = null;
              
                ValorLLave = (string)Registry.GetValue(@"HKEY_LOCAL_MACHINE\SOFTWARE\ParametrosProcesoUltimus\Organigrama", "LDAPForum", "   ");
                if (SectorLlaves == "HKEY_LOCAL_MACHINE")
                    rkPathRegistry = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, Environment.Is64BitOperatingSystem ? RegistryView.Registry64 : RegistryView.Registry32);
                if (SectorLlaves == "HKEY_CURRENT_USER")
                    rkPathRegistry = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, Environment.Is64BitOperatingSystem ? RegistryView.Registry64 : RegistryView.Registry32);

                rkValue = rkPathRegistry.OpenSubKey(@RutaLlaves, false);
                             
                if (rkValue != null)
                {
                    ValorLLave = (string)rkValue.GetValue(Llave);
                }

                string[] LlaveDesarmada = ValorLLave.Split(';');
                string sConexion = "";
                string sUsuario = "";
                string sPassword = "";
                string sNombre = "";
                string sLogin = "";
                string sEmail = "";

                for (int i = 0; i < LlaveDesarmada.Length - 1; i++)
                {
                    if (LlaveDesarmada[i].Substring(0, 2) == "CC") sConexion = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);

                    if (LlaveDesarmada[i].Substring(0, 2) == "UU") sUsuario = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);

                    if (LlaveDesarmada[i].Substring(0, 2) == "PP") sPassword = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);

                    if (LlaveDesarmada[i].Substring(0, 2) == "NN") sNombre = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);

                    if (LlaveDesarmada[i].Substring(0, 2) == "LL") sLogin = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);


                    if (LlaveDesarmada[i].Substring(0, 2) == "EE") sEmail = LlaveDesarmada[i].Substring(3, LlaveDesarmada[i].Length - 3);

                }
                
                DirectoryEntry dEntry = new DirectoryEntry(sConexion, sUsuario, sPassword, AuthenticationTypes.ServerBind);
                DirectorySearcher dSearcher = new DirectorySearcher(dEntry);
                //dSearcher.Filter = criterios;
                foreach (SearchResult result in dSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetDirectoryEntry() as DirectoryEntry;
                    listaUsuarios.Add(new LdapUsers()
                    {
                        
                        Name = de.Properties[sLogin].Value.ToString(),
                        UserName = de.Properties[sLogin].Value.ToString(),
                        PrincipalName = de.Properties[sNombre].Value.ToString()
                        //, Email = de.Properties[sEmail].Value.ToString()
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
        public JsonResult GetUsersfromRep(int IdDirectorio)
        {

            try
            {
                Directorio directorio = db.Directorio.Find(IdDirectorio);

                string Tipo = directorio.cadenaConexion;

                switch (Tipo)
                {
                    case "LDAPForum":
                        return GetUsersLDAP(directorio);

                    default:
                        throw new NotSupportedException("ResultSetKind not supported");
                }
                
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        
       
    }


        [HttpPost]
        public JsonResult GetLDAPUsers()
        {

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

                        Email = de.Properties["ou"].Value.ToString(),
                        Name = de.Properties["ou"].Value.ToString(),
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