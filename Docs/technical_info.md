## 2. 🧱 Tech Stack

| Layer            | Technology            |
|------------------|------------------------|
| Frontend         | React + TypeScript     |
| UI Framework     | Material UI (MUI v5)   |
| Routing          | React Router v6        |
| State Management | React Context / Redux (optional) |
| HTTP Client      | Axios                  |
| Authentication   | JWT (via Web API)      |
| Theming          | MUI Custom Theme (dark mode first) |

## 4. 🎨 UI Design Principles

| Element             | MUI Implementation                    |
|---------------------|----------------------------------------|
| **Dark Theme**      | `palette.mode = 'dark'`               |
| **Overview Cards**  | `Card`, `Box`, `Grid`                 |
| **Navigation Tabs** | `BottomNavigation` or `Drawer`        |
| **Typography**      | Customized in MUI theme               |
| **Data Highlights** | Large text, colored trends            |
| **Responsive UI**   | MUI Grid system + `useMediaQuery()`   |
| **Icons**           | `@mui/icons-material`                 |

## 5. 🎨 navigation

On desktop and tablet, Mynt uses rail navigation.Rail navigation provides a permanent region to navigate between sections, while taking up little screen space.
In a rail, each destination is represented by a unique icon. When a section is selected, it's icon becomes brighter and a section title is displayed.
When a section is selected, it displays a text label and a brighter color in the rail.

On mobile, Rally uses customized tabs to navigate between sections.
Unselected tabs are represented by icons. When a tab is selected, it displays a section title adjacent to the icon. Tabs make navigation persistently available, while taking up as little space as possible.
These tabs have no container, and display text only upon selection.
The tabs occupy fixed positions, without scrolling. When a new tab is tapped, they shift and redistribute themselves horizontally.

## 6. 🎨 Layout

Mynt uses a responsive grid system, which has flexible columns and padding that can resize to accommodate any screen width.

## 7. 🎨 Colour

Primary: #1EB980
Secondary: #045D56
#FF6859
#FFCF44
#B15DFF
#72DEFF

## 8. Typography

Mynt uses Lato and Eczar. 
All text content is set in Lato, while Eczar is used specifically for displaying numbers and numerical data.


## 6. 🔐 Authentication

- JWT stored in `localStorage`
- Axios interceptor adds `Authorization: Bearer <token>`
- Protected routes using a `<PrivateRoute />` wrapper


