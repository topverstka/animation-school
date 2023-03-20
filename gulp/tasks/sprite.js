// Генерация svg-спрайта в файле webpack.mix.cjs
// P.s. Да, я ленивая жопа. Мне было лень сделать все это в gulp. И пофиг, бог меня не накажет...

// import gulp from 'gulp'
// import svgSprite from "gulp-svg-sprite"

// export default function sprite() {
// 	return gulp.src(app.path.src.svgIcons)
// 		.pipe(svgSprite({
// 			mode: {
//                 // inline: true,
//                 // symbol: true,
// 				symbol: {
// 					sprite: '../img/sprite.svg',
// 					// example: true
// 				}
// 			},
// 			shape: {
// 				id: {
// 					separator: '',
// 					generator: ''
// 				},
// 				// transform: [
// 				// 	{
// 				// 		svgo: {
// 				// 			plugins: [
// 				// 				{ removeXMLNS: true },
// 				// 				{ convertPathData: false },
// 				// 				{ removeViewBox: false },
// 				// 			]
// 				// 		}
// 				// 	}
// 				// ]
// 			},
// 			svg: {
//                 xmlDeclaration: false
// 			// 	rootAttributes: {
// 			// 		"style": "display: none;",
// 			// 		"aria-hidden": true
// 			// 	},
// 			}
// 		}))
// 		.pipe(gulp.dest(app.path.srcFolder));
// }
