const MainLayout = () => import(/* webpackChunkName: "main-layout" */'../layouts/Main');
const LoginLayout = () => import(/* webpackChunkName: "login-layout" */'../layouts/Login');

const Catalog = () => import('../pages/Catalog');
const NewProduct = () => import('../pages/NewProduct');
const Product = () => import('../pages/Product');
const PostProduct = () => import('../pages/NewProduct/PostProduct');
const Authors = () => import('../pages/Authors');
const Author = () => import('../pages/Author');
const Home = () => import('../pages/Home');
const Sale = () => import('../pages/Sale');
const Journal = () => import('../pages/Journal');
const JournalDetails = () => import('../pages/JournalDetails');
const JournalDetailsEdit = () => import('../pages/JournalDetailsEdit');
const JournalCreator = () => import('../pages/JournalCreator');
const LikeJournal = () => import('../pages/LikeJournal');
const Blog = () => import('../pages/Blog');
const BlogAuthor = () => import('../pages/BlogAuthor');
const BlogCreateAndEdit = () => import('../pages/BlogCreateAndEdit');
const SelectedPostBlog = () => import('../pages/SelectedPostBlog');
const MyBlog = () => import('../pages/MyBlog');
const NewNotificationsBlogPosts = () => import('../pages/NewNotificationsBlogPosts.vue');
const Messages = () => import('../pages/Messages');
const Favorites = () => import('../pages/Favorites');
const ProductDetails = () => import('../pages/ProductDetails');
const Course = () => import('@/components/course/Course');
const Purchases = () => import('../pages/Purchases');

const Profile = () => import('../pages/Profile');
const StudentSection = () => import('@/components/profile/StudentSection');
const TeacherGeneral = () => import('@/components/profile/TeacherGeneral');
const StudentSetting = () => import("../components/profile/StudentSetting");

const UIKit = () => import('@/develop/UIKit');

// login layout
const Login = () => import('@/pages/login/Login');
const SignUp = () => import('@/pages/login/SignUp');
const EmailConfirm = () => import('@/pages/login/EmailConfirm');
const EmailVerify = () => import('@/pages/login/EmailVerify');
const Restore = () => import('@/pages/login/Restore');
const ChangePassword = () => import('@/pages/login/ChangePassword');


export const routes = [
{
	path: '/',
	component: MainLayout,
	children: [	
		{
			path: '',
			name: 'home',
			meta: {
				auth: true,
				title: 'Главная'
			},
			component: Home
		},
		// Продукты
		{
			path: 'catalog',
			name: 'catalog',
			component: Catalog,
			meta: {
				auth: true,
				title: 'Каталог продуктов'
			}
		},
		{
			path: 'newproduct',
			name: 'newproduct',
			component: NewProduct,
			meta: {
				auth: true,
				title: 'Создание продукта'
			}
		},
		{
			path: 'catalog/:id',
			name: 'Product',
			component: Product,
			meta: {
				auth: true,
				title: 'Просмотр продукта'
			}
		},
		// Авторы
		{
			path: 'authors',
			name: 'authors',
			component: Authors,
			props: (route) => ({ query: route.query }),
			meta: {
				auth: true,
				title: 'Авторы'
			}
		},
		{
			path: 'authors/:id',
			name: 'author',
			component: Author,
			meta: {
				auth: true,
				title: 'Просмотр автора'
			}
		},
		{
			path: 'cart',
			name: 'sale',
			component: Sale,
			meta: {
				auth: true,
				title: "Покупка продукта"
			}
		},
		{
			path: 'journal',
			name: 'journal',
			component: Journal,
			meta: {
				auth: true,
				title: "Каталог журналов"
			}
		},
		{
			path: 'journal/:id',
			name: 'journalDetails',
			component: JournalDetails,
			meta: {
				auth: true,
				title: "Журнал"
			}
		},
		{
			path: 'journal/:id/edit',
			name: 'journalDetailsEdit',
			component: JournalDetailsEdit,
			meta: {
				auth: true,
				title: "Редактирование журнала"
			}
		},
		{
			path: 'edit-journal/:id',
			name: 'edit-journal',
			component: JournalCreator,
			meta: {
				auth: true,
				title: "Создание журнала"
			}
		},
		{
			path: 'blog',
			name: 'blog',
			component: Blog
		},
		{
			path: 'blog/:id',
			name: 'blogId',
			component: SelectedPostBlog,
			meta: {
				auth: true,
			}
		},
		{
			path: 'blog/author/:id',
			name: 'blogAuthor',
			component: BlogAuthor,
			meta: {
				auth: true,
			}
		},
		{
			path: 'blog-create',
			name: 'blog-create',
			component: BlogCreateAndEdit,
			meta: {
				auth: true,
			}
		},
		{
			path: 'edit-blog/:id',
			name: 'edit-blog',
			component: BlogCreateAndEdit,
			meta: {
				auth: true,
			}
		},
		{
			path: 'my-blog',
			name: 'my-blog',
			component: MyBlog,
			meta: {
				auth: true,
			}
		},
		{
			path: 'profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
			},
			children: [
				{
					path: '',
					name: 'studentSection',
					component: StudentSection
				},
				{
					path: 'teacher',
					name: 'teacherSection',
					component: TeacherGeneral
				},
				{
					path: 'settings',
					name: 'studentSettings',
					component: StudentSetting
				},
				{
					path: 'new-blog-posts',
					name: 'new-blog-posts',
					component: NewNotificationsBlogPosts
				},
				{
					path: 'like-journal',
					name: 'like-journal',
					component: LikeJournal
				},
				{ path: 'purchases', name: 'purchases', component: Purchases },
				{ path: 'messages', name: 'messages', component: Messages },
				{
					path: 'createJournal',
					name: 'createJournal',
					component: JournalCreator
				}
			]
		},
		{ path: 'favorites', name: 'favorites', component: Favorites },
		{
			path: 'product/:id',
			name: 'product-info',
			meta: {
				auth: true,
			},
			children: [
				{
					path: 'details',
					name: 'details',
					component: ProductDetails,
					children: [
						{
							path: 'course',
							name: 'details-course',
							component: Course
						}
					]
				}
			]
		},
		{
			path: 'postproduct',
			name: 'postproduct',
			component: PostProduct,
			meta: {
				auth: true
			}
		},
		{
			path: 'uikit',
			name: 'uikit',
			component: UIKit
		}
	]
},

// Слой с центрированием по горизонтали и по вертикали
// (авторизация, регистрация, восстановление пароля)
{
	path: '/login',
	component: LoginLayout,
	children: [
		{
			path: '',
			name: 'Login',
			component: Login
		}
	]
},
{
	path: '/signup',
	component: LoginLayout,
	children: [
		{
			path: '',
			name: 'Signup',
			component: SignUp
		},
		{
			path: 'confirm',
			name: 'confirm',
			component: EmailConfirm
		},
		{
			path: 'verify',
			name: 'verify',
			component: EmailVerify
		},
	
	]
},
{
	path: '/restore',
	component: LoginLayout,
	children: [
		{
			path: '',
			name: 'restore',
			component: Restore
		},
		{
			path: 'password',
			name: 'changepassword',
			component: ChangePassword
		}
	]
}

];
