using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;
using System.Diagnostics;

namespace DiscordBotStarter
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            //string path = Directory.GetCurrentDirectory();
            string path = "C:\\Users\admin\\Desktop\\Porohobot - Discord - Bot";
            path += "\\start.bat";
            try
            {
                //Process.Start(path + "\\start.bat");
                var proc = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "cmd.exe",
                        Arguments = path,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = true
                    }
                };



                 proc.Start();
                while (!proc.StandardOutput.EndOfStream)
                {
                    logs.Content = proc.StandardOutput.ReadLine();
                    // do something with line
                }

            }

            catch (ArgumentNullException err)
            {
                logs.Content = err;
            }
            }
    }
}
