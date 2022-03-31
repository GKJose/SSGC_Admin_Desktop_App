export default function RestrictPermissions() {

    return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Restrict Permissions</h2>
          <table>
            <thead>
              <tr>
                <th>Permissions</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td><input id = "Functions" type ="checkbox" ></input></td>
              <td>Functions</td>
            </tr>
            <tr>
              <td><input id = "Graphing" type ="checkbox" ></input></td>
              <td>Graphing</td>
            </tr>
            <tr>
              <td><input id = "History_Tracking" type ="checkbox" ></input></td>
              <td>History Tracking</td>
            </tr>
            <tr>
              <td><input id = "screenCapture" type ="checkbox" ></input></td>
              <td>Screen Capture</td>
            </tr>
            <tr>
              <td><input id = "Remote_Connection" type ="checkbox" ></input></td>
              <td>Remote Connection</td>
            </tr>
            <tr>
              <td><input id = "Settings_Override" type ="checkbox" ></input></td>
              <td>Settings Override</td>
            </tr>
            <tr>
              <td><input id = "Payload_Enable" type ="checkbox" ></input></td>
              <td>Enable Payload</td>
            </tr>
          </tbody>
          </table>
        </main>
      );
}