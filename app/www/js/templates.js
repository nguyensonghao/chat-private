angular.module('templates-main', ['views/about/main.html', 'views/chat/main.html', 'views/help/main.html', 'views/jlpt/main.html', 'views/jlpt/right.html', 'views/news/main.html', 'views/news/right.html', 'views/note/main.html', 'views/note/right.html', 'views/search/main.html', 'views/search/right.html', 'views/term/main.html', 'views/write/main.html', 'views/write/right.html', 'components/example/example-template.html', 'components/footer/footer-template.html', 'components/google-translate/google-translate-template.html', 'components/grammar/grammar-template.html', 'components/history/history-template.html', 'components/kanji-draw/kanji-draw-template.html', 'components/kanji-recognize/kanji-recognize-template.html', 'components/kanji-result-search-word/kanji-result-search-word-template.html', 'components/kanji/kanji-template.html', 'components/news/newsother-template.html', 'components/notes/category-template.html', 'components/notes/note-content-template.html', 'components/notes/note-template.html', 'components/notify/notify-template.html', 'components/report/report-template.html', 'components/review/review-template.html', 'components/setting/setting-template.html', 'components/synonyms/synonyms-template.html', 'components/verb-conjugtion/verb-conjugtion-template.html', 'components/word/word-template.html']);

angular.module("views/about/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about/main.html",
    "<div class=\"widget-container about-screen\">\n" +
    "    <h2>Giới thiệu về Mazii</h2>\n" +
    "\n" +
    "    <p class=\"about-head\">Mazii là gì?</p>\n" +
    "    Mazii là từ điển tiếng Nhật dành cho người Việt Nam. Cho phép mọi người tra cứu từ điển Nhật Việt, Việt Nhật, từ điển Hán tự và tra cứu ngữ pháp tiếng Nhật một cách chính xác.<br>\n" +
    "    <p>Hiện nay kho dữ liệu của Mazii đang ngày càng hoàn thiện với</p>\n" +
    "    <ul>\n" +
    "        <li>Từ điển Nhật - Việt: 250.000 từ</li>\n" +
    "        <li>Từ điển Việt - Nhật: 100.000 từ</li>\n" +
    "        <li>Từ điển Kanji: 11.000 từ</li>\n" +
    "        <li>Từ điển ngữ pháp: 600 mẫu</li>\n" +
    "        <li>Từ điển mẫu câu: 75.000 mẫu</li>\n" +
    "    </ul>\n" +
    "    <p class=\"about-head\">Sứ mệnh của Mazii</p>\n" +
    "    Cung cấp các công cụ hỗ trợ học tiếng Nhật tốt nhất cho người Việt Nam.\n" +
    "\n" +
    "    <p class=\"about-head\">Liên hệ</p>\n" +
    "    Mazii luôn nỗ lực để có thể đem lại những gì tốt nhất cho người dùng, vì vậy sẽ rất vui khi nhận được những ý kiến phản hồi của các bạn. Nếu có bất kỳ ý kiến đóng góp hoặc thắc mắc, mời bạn liên lạc với chúng tôi qua:\n" +
    "    <p>Email:\n" +
    "        <a href=\"mailto:support@mazii.net\">support@mazii.net</a>\n" +
    "    </p>\n" +
    "    <br>\n" +
    "</div>");
}]);

angular.module("views/chat/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/chat/main.html",
    "<div class=\"main-chat widget-container col-md-12\" ng-if=\"loadDone\">\n" +
    "	<div class=\"col-md-4\">\n" +
    "		<ul class=\"menu-tab\">\n" +
    "			<li ng-click=\"changeTab(1)\" ng-class=\"tab_1\">\n" +
    "				<p>Chat nhóm</p>\n" +
    "			</li>\n" +
    "			<li ng-click=\"changeTab(2)\" ng-class=\"tab_2\">\n" +
    "				<p>Chat riêng \n" +
    "					<span class=\"new-message\" ng-if=\"newMessage\">N</span>\n" +
    "				</p>\n" +
    "			</li>\n" +
    "			<li ng-click=\"changeTab(3)\" ng-class=\"tab_3\">\n" +
    "				<p>Danh sách</p>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "\n" +
    "		<div class=\"content\">\n" +
    "			<div class=\"box-chat\">\n" +
    "				<div class=\"chat-public\" ng-if=\"tabActive == 1\">\n" +
    "					<div class=\"list-message\">\n" +
    "						<ul class=\"list-group\">\n" +
    "							<li class=\"list-group-item group-0 group-jlpt-active\" \n" +
    "							ng-click=\"changeScreen(0)\">\n" +
    "								Nhóm chung\n" +
    "							</li>\n" +
    "							<li class=\"list-group-item group-5\" ng-click=\"changeScreen(5)\">\n" +
    "								JLPT N5\n" +
    "							</li>\n" +
    "							<li class=\"list-group-item group-4\" ng-click=\"changeScreen(4)\">\n" +
    "								JLPT N4\n" +
    "							</li>\n" +
    "							<li class=\"list-group-item group-3\" ng-click=\"changeScreen(3)\">\n" +
    "								JLPT N3\n" +
    "							</li>\n" +
    "							<li class=\"list-group-item group-2\" ng-click=\"changeScreen(2)\">\n" +
    "								JLPT N2\n" +
    "							</li>\n" +
    "							<li class=\"list-group-item group-1\" ng-click=\"changeScreen(1)\">\n" +
    "								JLPT N1\n" +
    "							</li>\n" +
    "						</ul>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"chat-list-private\" ng-if=\"tabActive == 2\">\n" +
    "					<ul class=\"list-message-receive\">\n" +
    "						<li class=\"list-group-item message-receive \n" +
    "						message-private-{{message.status}}\" \n" +
    "						ng-repeat=\"message in listmessageReceive track by $index | orderBy:'status'\"\n" +
    "						ng-click=\"redirectChatPrivatetoListMessage(message)\">\n" +
    "							<div class=\"avatar\">\n" +
    "								{{ message.your_username.slice(0, 1).toUpperCase() }}\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"detail\">\n" +
    "								<p class=\"username\">{{ message.your_username }}</p>\n" +
    "								<p class=\"content\">{{ message.message }}</p>\n" +
    "								<div class=\"date\">\n" +
    "									{{ message.date }}\n" +
    "								</div>\n" +
    "							</div>\n" +
    "\n" +
    "						</li>\n" +
    "					</ul>\n" +
    "				</div>\n" +
    "				<div class=\"chat-list-user\" ng-if=\"tabActive == 3\">\n" +
    "					<ul class=\"list-group list-user\">\n" +
    "						<li class=\"list-group-item\" ng-repeat=\"user in listUser\"\n" +
    "						ng-click=\"redirectChatPrivate(user)\">\n" +
    "							{{ user.username }}\n" +
    "						</li>\n" +
    "					</ul>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"col-md-8 screen-chat\">\n" +
    "		<div class=\"bar\">	\n" +
    "			{{ titleBar }}\n" +
    "			<div class=\"btn-group username\" ng-if=\"user != null\">\n" +
    "			  	<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "			    	<span>{{ user.username }}</span> \n" +
    "					<span class=\"glyphicon glyphicon-cog\"></span>\n" +
    "			  	</button>\n" +
    "			  	<ul class=\"dropdown-menu\">\n" +
    "			    	<li>\n" +
    "			    		<a ng-click=\"logoutFacebook()\">Đăng xuất</a>\n" +
    "			    	</li>\n" +
    "			  	</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"login-form col-md-8 col-md-offset-2\" ng-if=\"showLogin\">\n" +
    "			<p>Bạn phải đăng nhập</p>\n" +
    "			<div class=\"login-facebook\">\n" +
    "				<img src=\"imgs/facebook.png\" height=\"50px\" ng-click=\"loginFacebook()\">\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 0\">\n" +
    "			<div class=\"list-message\" id=\"list-message-0\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 0\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p ng-click=\"redirectChatPrivatetoDetailUser(message)\">\n" +
    "								{{ message.username }}\n" +
    "							</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-0\" ng-keypress=\"formChat.enterChat($event, 0)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(0)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 1\">\n" +
    "			<div class=\"list-message\" id=\"list-message-1\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 1\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p class=\"username\">{{ message.username }}</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-1\" ng-keypress=\"formChat.enterChat($event, 1)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(1)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 2\">\n" +
    "			<div class=\"list-message\" id=\"list-message-2\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 2\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p class=\"username\">{{ message.username }}</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-2\" ng-keypress=\"formChat.enterChat($event, 2)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(2)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 3\">\n" +
    "			<div class=\"list-message\" id=\"list-message-3\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 3\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p class=\"username\">{{ message.username }}</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-3\" ng-keypress=\"formChat.enterChat($event, 3)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(3)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 4\">\n" +
    "			<div class=\"list-message\" id=\"list-message-4\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 4\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p class=\"username\">{{ message.username }}</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-4\" ng-keypress=\"formChat.enterChat($event, 4)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(4)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"chat-public\" ng-if=\"!showLogin && tabScreen == 5\">\n" +
    "			<div class=\"list-message\" id=\"list-message-5\">\n" +
    "				<div class=\"message-public\" ng-if=\"message.index == 5\" \n" +
    "				ng-repeat=\"message in listMessage\"> \n" +
    "					<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "						{{ message.username.slice(0, 1).toUpperCase() }}\n" +
    "						<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "							<p class=\"username\">{{ message.username }}</p>\n" +
    "							<p><i class=\"fa fa-clock-o\"></i> {{ message.date_send }}</p>\n" +
    "						</div>\n" +
    "					</div> \n" +
    "					<div class=\"text text-{{message._id}}\">\n" +
    "						<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "						<span ng-if=\"message.newLine\">\n" +
    "							<p ng-repeat=\"line in message.message\">\n" +
    "								{{line}}\n" +
    "							</p>\n" +
    "						</span>\n" +
    "						<button class=\"translate\" \n" +
    "						ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "							dịch\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-5\" ng-keypress=\"formChat.enterChat($event, 5)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChat(5)\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"chat-private\" ng-if=\"!showLogin && tabScreen == 6\">\n" +
    "			<div class=\"list-message list-message-private\"  id=\"list-message-6\">\n" +
    "				<div ng-repeat=\"message in listMessagePrivate\">\n" +
    "					<div class=\"my_message message-private\" ng-if=\"message.flag == 0\">\n" +
    "						<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "							{{ message.my_username.slice(0, 1).toUpperCase() }}\n" +
    "							<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "								<p class=\"username\">{{ message.my_username }}</p>\n" +
    "								<p><i class=\"fa fa-clock-o\"></i> {{ message.date }}</p>\n" +
    "							</div>\n" +
    "						</div> \n" +
    "						<div class=\"text text-{{message._id}}\">\n" +
    "							<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "							<span ng-if=\"message.newLine\">\n" +
    "								<p ng-repeat=\"line in message.message\">\n" +
    "									{{line}}\n" +
    "								</p>\n" +
    "							</span>\n" +
    "							<button class=\"translate\" \n" +
    "							ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "								dịch\n" +
    "							</button>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"your_message message-private\" ng-if=\"message.flag == 1\">\n" +
    "						<div class=\"avatar\" ng-click=\"showDetailUser(message._id)\">\n" +
    "							{{ message.your_username.slice(0, 1).toUpperCase() }}\n" +
    "							<div class=\"detail-user detail-user-{{message._id}}\">\n" +
    "								<p class=\"username\">{{ message.your_username }}</p>\n" +
    "								<p><i class=\"fa fa-clock-o\"></i> {{ message.date }}</p>\n" +
    "							</div>\n" +
    "						</div> \n" +
    "						<div class=\"text text-{{message._id}}\">\n" +
    "							<span ng-if=\"!message.newLine\">{{ message.message }}</span>\n" +
    "							<span ng-if=\"message.newLine\">\n" +
    "								<p ng-repeat=\"line in message.message\">\n" +
    "									{{line}}\n" +
    "								</p>\n" +
    "							</span>\n" +
    "							<button class=\"translate\" \n" +
    "							ng-click=\"translateMessage(message.message, message._id)\">\n" +
    "								dịch\n" +
    "							</button>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "			</div>\n" +
    "			<div class=\"enter-message\">\n" +
    "				<div class=\"input-group\">\n" +
    "			      <textarea class=\"form-control\" placeholder=\"Nhập tin nhắn\" rows=\"3\" \n" +
    "			      id =\"enter-chat-message-6\" ng-keypress=\"formChat.enterChatPrivate($event)\"></textarea>\n" +
    "			      <div class=\"input-group-addon\" ng-click=\"formChat.sendChatPrivate()\">\n" +
    "			      	<span class=\"glyphicon glyphicon-send\"></span>\n" +
    "			      </div>\n" +
    "			    </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"chat-list-user\" ng-if=\"!showLogin && tabScreen == 7\">\n" +
    "			<div class=\"information-list-user\">\n" +
    "				<span ng-if=\"listUser.length > 0\">\n" +
    "					<p>Hiện tại đang có {{listUser.length + 1}} người đang online</p>\n" +
    "					<p>Hãy chọn 1 người bạn để trò chuyện nào</p>\n" +
    "				</span>\n" +
    "				<p ng-if=\"listUser.length == 0\">\n" +
    "					Hiện tại có duy nhất bạn đang online\n" +
    "				</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("views/help/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/help/main.html",
    "<div class=\"widget-container help-screen\">\n" +
    "  <h3>Bạn muốn đặt câu hỏi? Bấm <a href=\"#\" id=\"forward-to-chat\">đây</a>.</h3>\n" +
    "\n" +
    "  <h3>Các câu hỏi thường gặp</h3>\n" +
    "\n" +
    "<p class=\"about-head\">Không gõ được tiếng Nhật</p>\n" +
    "Không gõ được tiếng Nhật có thể là do bạn chưa cài đặt bàn phím tiếng Nhật. \n" +
    "    Bạn vui lòng cài đặt bàn phím tiếng Nhật theo hướng dẫn tại <a href=\"http://www.saromalang.com/2012/10/ban-phim-tieng-nhat-va-go-tieng-nhat.html\">đây</a>.\n" +
    "\n" +
    "<p class=\"about-head\">Không tra được từ, không vẽ được chữ kanji...</p>\n" +
    "    Khi website thực hiện nâng cấp, có thể xảy ra tính trạng website hoạt động không đúng. Như là không tra được từ, không vẽ được kanji... Khi đó các bạn vui lòng refresh lại website bằng cách nhấn vào biểu tượng refresh của trình duyệt để website tải lại. Nếu tình trạng lỗi vẫn tiếp tục diễn ra, Mazii rất mong nhận được thông báo của các bạn.    \n" +
    "</div>\n" +
    "<div class=\"widget-container\">\n" +
    "    <div id=\"facebook-chat\">\n" +
    "        <h4>Đóng góp ý kiến giúp Mazii phục vụ bạn tốt hơn :)</h4>\n" +
    "\n" +
    "        <div class=\"fb-comments\" data-href=\"http://mazii.net\" data-numposts=\"5\" data-colorscheme=\"light\"></div>\n" +
    "</div>");
}]);

angular.module("views/jlpt/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/jlpt/main.html",
    "<div class=\"btn-group jlpt-option\">\n" +
    "    <div class=\"btn-group\" id=\"jlpt-type\" value=\"{{ type }}\">\n" +
    "        <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n" +
    "            <span ng-if=\"type == 'kanji'\"> Hán tự</span>\n" +
    "            <span ng-if=\"type == 'grammar'\"> Ngữ pháp</span>\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"jlpt-type\">\n" +
    "            <li><a tabindex=\"-1\" value=\"kanji\" ng-click=\"selectType('kanji')\" data-target=\"#\">Hán tự</a>\n" +
    "            </li>\n" +
    "            <li><a tabindex=\"-1\" value=\"grammar\" ng-click=\"selectType('grammar')\" data-target=\"#\">Ngữ pháp</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"btn-group\" id=\"jlpt-level\" value=\"{{ level }}\">\n" +
    "        <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n" +
    "            <span>N{{ level }}</span>\n" +
    "            <i class=\"fa fa-caret-down\"></i>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"jlpt-level\">\n" +
    "            <li><a tabindex=\"-1\" value=\"5\" ng-click=\"selectLevel(5)\" data-target=\"#\">N5</a>\n" +
    "            </li>\n" +
    "            <li><a tabindex=\"-1\" value=\"4\" ng-click=\"selectLevel(4)\" data-target=\"#\">N4</a>\n" +
    "            </li>\n" +
    "            <li><a tabindex=\"-1\" value=\"3\" ng-click=\"selectLevel(3)\" data-target=\"#\">N3</a>\n" +
    "            </li>\n" +
    "            <li><a tabindex=\"-1\" value=\"2\" ng-click=\"selectLevel(2)\" data-target=\"#\">N2</a>\n" +
    "            </li>\n" +
    "            <li><a tabindex=\"-1\" value=\"1\" ng-click=\"selectLevel(1)\" data-target=\"#\">N1</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-query\" ng-click=\"query()\">Xem</button>\n" +
    "</div>\n" +
    "<div class=\"page-selector\" ng-if=\"list != null\">\n" +
    "    <button type=\"button\" class=\"btn pager-btn pager-left\" ng-class=\"getPreState();\" ng-click=\"prePage()\"><i class=\"fa fa-caret-left fa-2x\"></i></button>\n" +
    "    <button type=\"button\" class=\"btn pager-btn pager-right\" ng-class=\"getNextState();\" ng-click=\"nextPage();\"><i class=\"fa fa-caret-right fa-2x\"></i></button>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"jlpt-detail\">\n" +
    "    <div id=\"grammar-result-search\" class=\"widget-container table-grammar-list\" ng-if=\"type == 'grammar'  && list != null\">\n" +
    "        <div class=\"grammar-jlpt\" ng-repeat=\"item in list track by $index\">\n" +
    "            <a class=\"grammar-link\" ng-click=\"showGrammar(item.id)\"><span class=\"index\">{{ $index + 1 + length }}.</span> {{ getBeautyTitleGrammar(item.value.title) }}</a>\n" +
    "            <span class=\"grammar-mean\" ng-bind-html=\"getBeautyDescGrammar(item)\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"kanji-detail-result\" class=\"widget-container table-kanji-list\" ng-if=\"type == 'kanji' && list != null\">\n" +
    "        <div class=\"kanji-jlpt-char\" ng-repeat=\"item in list track by $index\">\n" +
    "            <a class=\"kanji-link\" ng-click=\"showKanji(item.value.kanji)\">\n" +
    "                <div class=\"jlpt-kanji-kanji\">{{ item.value.kanji }}</div>\n" +
    "                <div class=\"jlpt-kanji-mean\" ng-if=\"showhanViet\">{{ item.value.mean.split(',')[0] }}</div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"page-selector\" ng-if=\"list != null\">\n" +
    "    <button type=\"button\" class=\"btn pager-btn pager-left\" ng-class=\"getPreState();\" ng-click=\"prePage()\"><i class=\"fa fa-caret-left fa-2x\"></i></button>\n" +
    "    <button type=\"button\" class=\"btn pager-btn pager-right\" ng-class=\"getNextState();\" ng-click=\"nextPage();\"><i class=\"fa fa-caret-right fa-2x\"></i></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/jlpt/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/jlpt/right.html",
    "<!--<div class=\"history-container\">\n" +
    "    <ng-history></ng-history>\n" +
    "</div>-->\n" +
    "");
}]);

angular.module("views/news/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/news/main.html",
    "<div class=\"main-news widget-container\" id=\"{{currentNews._id}}\">\n" +
    "    <div class=\"main-news-title\">\n" +
    "        <p ng-bind-html=\"currentNews.title\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"main-news-time\">{{ currentNews.pubDate }}</div>\n" +
    "\n" +
    "    <div id=\"main-news-picture-div\" ng-if=\"currentNews.content.image != '' && currentNews.content.image != null\">\n" +
    "        <img id=\"main-news-picture\" class=\"movie-news-sm movie-news-md\" src=\"{{ checkLink(currentNews.content.image); }}\" ng-if=\"!showVideo\">\n" +
    "        <div class=\"movie-play-btn\" ng-if=\"videoAvailable() && !showVideo\">\n" +
    "            <img src=\"imgs/play.png\" ng-click=\"playVideo()\"></img>\n" +
    "        </div>\n" +
    "        </img>\n" +
    "        <div id=\"news_image_div3\" ng-if=\"showVideo && !isMobile()\" ng-bind-html=\"getVideo()\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"main-news-body\">\n" +
    "        <p ng-bind-html=\"currentNews.content.textbody\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"main-news-more\">\n" +
    "        <p ng-bind-html=\"currentNews.content.textmore\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"news-source\">ソース：<a href=\"{{ currentNews.link }}\" target=\"blank\">NHK　ニュース</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"box-search\" ng-click=\"translate()\">\n" +
    "    <img src=\"imgs/search.png\" height=\"30px\">\n" +
    "</div>");
}]);

angular.module("views/news/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/news/right.html",
    "<div class=\"news-block\">\n" +
    "	<ng-newsother></ng-newsother>\n" +
    "</div>");
}]);

angular.module("views/note/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/note/main.html",
    "<div class='note-block'>\n" +
    "    <div class=\"widget-container\">\n" +
    "        <div class=\"news-title\">\n" +
    "            <button class='btn btn-default note-add' data-toggle=\"modal\" data-target=\"#myCategory\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "            </button>\n" +
    "            <div class=\" note-edit\">\n" +
    "                <button class='btn btn-default' ng-click=\"showEdit()\">\n" +
    "                    <span class=\"glyphicon glyphicon-edit\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <hr class=\"note-hr-heading\">\n" +
    "        <div class=\"note-item\" ng-if=\"category.length != 0\"  ng-repeat=\"item in category\" ng-click=\"getNoteItem(item.category)\" ng-class=\"{ 'unseen': activeItem !== item }\">\n" +
    "            <div class=\"note-content\">{{ item.category }}</div>\n" +
    "            <button class=\"category-delete btn btn-default btn-sm\" ng-class=\"getDeleteState()\" ng-click=\"deleteCategory(item.category)\">\n" +
    "                <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "            </button>\n" +
    "            <div class=\"note-time\">{{ getTime(item.date) }}</div>\n" +
    "        </div>\n" +
    "        <div class=\"note-item-not\" ng-if=\"category.length == 0\">\n" +
    "            Bạn chưa tạo nhóm.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<ng-category></ng-category>\n" +
    "");
}]);

angular.module("views/note/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/note/right.html",
    "<ng-note></ng-note>");
}]);

angular.module("views/search/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/search/main.html",
    "<div class=\"search-input-container\">\n" +
    "    <div class=\"btn-group search-option\">\n" +
    "        <button class=\"btn btn-default search-option-word tab-active\" id=\"tab0\" ng-click=\"changeTypeSearch(0)\"><span>Từ vựng</span>\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-default search-option-kanji\" id=\"tab1\" ng-click=\"changeTypeSearch(1)\"><span>Hán tự</span></button>\n" +
    "         <button class=\"btn btn-default search-option-example\" id=\"tab2\" ng-click=\"changeTypeSearch(2)\"> <span>Câu</span></button>\n" +
    "        <button class=\"btn btn-default search-option-grammar\" id=\"tab3\" ng-click=\"changeTypeSearch(3)\"><span>Ngữ pháp</span>\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-default search-option-grammar not-mobile\" id=\"tab3\" ng-click=\"showHistoryPanel()\"><span>Lịch sử</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"input-group input-group-lg search-box-range col-xs-12 col-md-8 col-no-padding\">\n" +
    "        <input type=\"text\" placeholder=\"日本, nihon, Nhật Bản\" maxlength=\"64\" id=\"search-text-box\" class=\"form-control\" ng-enter=\"inputEnter();\"　focus-me>\n" +
    "        <button type=\"button\" class=\"btn btn-link\" id=\"show-draw-kanji\" title=\"Ẩn/Hiện bảng vẽ kanji\" ng-click=\"showKanjiDrawTable();\">\n" +
    "            <span class=\"fa fa-pencil-square-o fa-lg\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-link\" ng-if=\"queryNotNull()\" ng-click=\"clearQuery();\" id=\"clear-search-text\">\n" +
    "            <span class=\"fa fa-times fa-lg\"></span>\n" +
    "        </button>\n" +
    "        <div class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" id=\"search-button\" ng-click=\"inputEnter();\">\n" +
    "                <span class=\"fa fa-search fa-lg\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <ng-kanji-recognize ng-if=\"isShowKanjiDraw()\"></ng-kanji-recognize>\n" +
    "</div>\n" +
    "<div class=\"list-suggest-history col-xs-12 col-md-8\" id=\"list-suggest-history\">\n" +
    "    <div class=\"suggest-item\" ng-repeat=\"item in suggestSen track by $index\" ng-click=\"suggestClick(item)\">\n" +
    "        <span><b>{{ item.split(' ')[0] }}</b> {{ item.replace(item.split(' ')[0], '') }} </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"notify-new-version widget-container\" ng-if=\"showNotifynewVersion && !startSearch\">\n" +
    "    <ng-notify></ng-notify>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"tab-container col-md-12 col-xs-12 no-padding\">\n" +
    "    <div label=\"Từ vựng\" ng-if=\"tabSelected == 0\" class=\"col-md-6 col-xs-12 result-word\">\n" +
    "        <div class=\"words-list\" ng-if=\"words != null\">\n" +
    "            <ng-word ng-repeat=\"word in words\" data=\"word\"></ng-word>\n" +
    "        </div>\n" +
    "        <div class=\"google-translate\" ng-if=\"words == null || words.length == 0\">\n" +
    "            <ng-google-translate data=\"googleTranslate\" ng-if=\"googleTranslate\"></ng-google-translate>\n" +
    "        </div>\n" +
    "        <div class=\"widget-container\" ng-if=\"conjugationVerb != null\">\n" +
    "            <ng-verb-conjugtion data=\"conjugationVerb\"></ng-verb-conjugtion>\n" +
    "        </div>\n" +
    "        <ng-synonyms data=\"googleTranslate\" ng-if=\"googleTranslate\"></ng-synonyms>\n" +
    "        \n" +
    "        <div class=\"suggest-list\" ng-if=\"suggest != null && suggest.length > 0\">\n" +
    "            <div class=\"suggest-title\">Các từ liên quan đến <b>{{ query }}</b></div>\n" +
    "            <div class=\"suggest-box\" ng-repeat=\"word in suggest\" \n" +
    "            ng-click=\"showDetailSuggest(word._id)\">\n" +
    "                <div class=\"{{word._id}}\">\n" +
    "                    <p><span class=\"ja\">{{ word.word }}</span> {{ word.phonetic }}</p>\n" +
    "                    <p>◆ {{ word.means[0].mean }}</p>\n" +
    "                    <p class=\"button-show\">\n" +
    "                        <i class=\"fa fa-caret-down\" class=\"icon_{{ word._id }}\"></i>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"detail_{{word._id}} hiden detail-suggest\">\n" +
    "                    <p class=\"ja\">{{ word.word }}</p>\n" +
    "                    <i class=\"audio-word fa fa-volume-down fa-lg\" \n" +
    "                    ng-click=\"playAudio(word.phonetic)\"></i>\n" +
    "                    <p class=\"phonetic\" ng-if=\"word.phonetic != null && word.phonetic != ''\">\n" +
    "                        {{ word.phonetic }}\n" +
    "                    </p>\n" +
    "                    <div class=\"type-word\" \n" +
    "                        ng-if=\"word.means[0].kind != null && word.means[0].kind != ''\">\n" +
    "                        ☆ {{ convertKindToReadable(word.means[0].kind) }} \n" +
    "                    </div>\n" +
    "                    <p class=\"mean\">◆ {{ word.means[0].mean }}</p>\n" +
    "                    <div ng-repeat=\"example in word.means[0].examples\" class=\"example\">\n" +
    "                        <p class=\"content\">{{ example.content }}</p>\n" +
    "                        <p class=\"mean\">{{ example.mean }}</p>\n" +
    "                    </div><br>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"no-result\" ng-if=\"noResults\">\n" +
    "            Không tìm thấy từ vựng nào có liên quan tới: <b>{{ query }}</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6 col-sx-12 result-kanji-search-word\" ng-if=\"tabSelected == 0 && !noResultsKanjis && resultKanjis != null\">\n" +
    "        <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n" +
    "            <p>Các chữ Hán trong <b>{{ query }}</b></p>\n" +
    "            <div class=\"panel panel-default\" ng-repeat=\"kanji in resultKanjis\">\n" +
    "                <div class=\"panel-heading\" id=\"heading{{kanji._id}}\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse{{kanji._id}}\" aria-expanded=\"true\" \n" +
    "                    aria-controls=\"collapse{{kanji._id}}\">\n" +
    "                  <h4 class=\"panel-title\">\n" +
    "                        <span class=\"kanji\"> {{ kanji.kanji }} </span>\n" +
    "                        「{{ kanji.on }}」 \n" +
    "                        <b class=\"mean\">{{kanji.mean}}</b>\n" +
    "                  </h4>\n" +
    "                </div>\n" +
    "                <div id=\"collapse{{kanji._id}}\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading{{kanji._id}}\">\n" +
    "                  <div class=\"panel-body\">\n" +
    "                    <ng-kanji-result-search-word data=\"kanji\"></ng-kanji-result-search-word>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div label=\"Hán tự\" ng-if=\"tabSelected == 1\">\n" +
    "        <div class=\"list-kanji\" ng-if=\"kanjis != null\">\n" +
    "            <div class=\"btn-group\">\n" +
    "                <button type=\"button\" ng-repeat=\"kanji in kanjis\" class=\"btn btn-default btn-lg draw-single-kanji\" ng-click=\"changeKanjiShow($index);\" ng-class=\"kanjiSeletectClass($index);\">{{ kanji.kanji }}</button>\n" +
    "            </div>\n" +
    "            <div id=\"kanji-detail-result\">\n" +
    "                <ng-kanji data=\"getCurrentKanji()\"></ng-kanji>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"no-result\" ng-if=\"noResults\">\n" +
    "            Không có dữ liệu về chữ kanji: <b>{{ query }}</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div label=\"Mẫu câu\" ng-if=\"tabSelected == 2\" class=\"col-md-6 col-xs-12 result-example\">\n" +
    "        <div class=\"examples-list widget-container\" ng-if=\"examples != null\">\n" +
    "            <ng-example ng-repeat=\"exam in examples\" index=\"{{$index + 1}}\" data=\"exam\"></ng-example>\n" +
    "        </div>\n" +
    "        <div class=\"no-result\" ng-if=\"noResults\">\n" +
    "            Không tìm thấy ví dụ nào có liên quan tới: <b>{{ query }}</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div label=\"Ngữ pháp\" ng-if=\"tabSelected == 3\" class=\"col-md-6 col-xs-12 result-grammar\">\n" +
    "        <div class=\"grammar-list\" ng-if=\"grammars != null\">\n" +
    "            <ng-grammar ng-repeat=\"gr in grammars\" data=\"gr\"></ng-grammar>\n" +
    "        </div>\n" +
    "        <div class=\"no-result\" ng-if=\"noResults\">\n" +
    "            Không tìm thấy ngữ pháp: <b>{{ query }}</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n" +
    "");
}]);

angular.module("views/search/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/search/right.html",
    "<!--<div class=\"history-container\">\n" +
    "    <ng-history></ng-history>\n" +
    "</div>\n" +
    "<div class=\"fb-page\" data-href=\"https://www.facebook.com/maziinet\"\n" +
    "  data-height=\"280\" data-hide-cover=\"false\" data-show-facepile=\"true\" \n" +
    "  data-show-posts=\"false\"></div>-->\n" +
    "");
}]);

angular.module("views/term/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/term/main.html",
    "<div class=\"widget-container term-screen\">\n" +
    "	<h3>Điều khoản sử dụng</h3>\n" +
    "	<p>Với việc sử dụng Mazii, bao gồm phiên bản trình duyệt và các phiên bản dành cho điện thoại di động, bạn đồng ý chấp nhận các điều khoản nêu dưới đây. Những điều khoảng này có hiệu lực ngay khi bạn lần đầu tiên dùng Mazii.</p>\n" +
    "\n" +
    "	<p class=\"title\">Sử dụng Mazii</p>\n" +
    "	<p>Bạn đồng ý dùng Mazii chỉ với mục đích hỗ trợ, tham khảo và không xâm phạm quyền, giới hạn hoặc ngăn cấm người khác sử dụng Mazii.</p>\n" +
    "\n" +
    "	<p class=\"title\">Bản quyền trí tuệ</p>\n" +
    "	<p>Tất cả các bản quyền, mẫu mã, quyền về kiểu mẫu, bằng sáng chế và các quyền sở hữu trí tuệ khác (đăng ký cũng như không đăng ký) trên và trong Mazii và tất cả các nội dung (dưới mọi hình thức) được đặt trên mạng đều thuộc quyền sở hữu của Mazii hoặc người cấp phép cho Mazii. Bạn không được sao chép, tái bản, cắt xén, tải xuống, chuyển tải, hoặc dùng nội dung của Mazii bất cứ trong trường hợp nào, ngoại trừ cho mục đích cá nhân và không mang tính chất thương mại. Nếu dùng nội dung của Mazii cho những mục đích khác, bạn phải được Mazii cho phép trước bằng văn bản.</p>\n" +
    "\n" +
    "	<p class=\"title\">Thu thập thông tin</p>\n" +
    "	<p>Khi bạn sử dụng Mazii, chúng tôi sẽ thu thập thông tin của bạn. Bao gồm, địa chỉ ip, thông tin tài khoản bạn cung cấp như email và mật khẩu, thông tin về thiết bị di động như mã thiết bị, mã quảng cáo.  Khi bạn thanh toán, mua vật phẩm trong ứng dụng, chúng tôi có thể lưu lại thông tin về tài khoản và giao dịch của bạn. Chúng tôi luôn cố gắng nhất có thể để đảm bảo các thông tin của bạn được an toàn.</p>\n" +
    "\n" +
    "	<p class=\"title\">Đóng góp nội dung cho Mazii</p>\n" +
    "	<p>Tất các các nội dung do người dùng đóng góp, sẽ được chúng tôi sử dụng để chia sẻ cho các người dùng khác. Các nội dung liên quan tới chính trị, phân biệt chủng tộc, văn hoá phẩm đồi truỵ sẽ bị xoá bỏ mà không cần thông báo trước. Trường hợp các nội dung được đóng góp vi phạm bản quyền nội dung, chúng tôi sẽ thực hiện xoá nội dung khỏi hệ thống mà không thông báo trước khi nhận được thông báo của tác giả nội dung. Tất cả nội dung người dùng đóng sẽ thuộc quyền sở hữu của Mazii, Mazii được tuỳ ý sử dụng mà không cần phải thông báo trước.</p>\n" +
    "\n" +
    "	<p class=\"title\">Miễn trừ trách nhiệm</p>\n" +
    "	<p>Mazii hoạt động như một dịch vụ hỗ trợ người học tiếng Nhật và không phải là phương pháp giáo dục thay thế phương pháp giáo dục khác. Chúng tôi tuyên bố không chịu trách nhiệm với các nội dung được đăng tải trên hệ thống của chúng tôi, bao gồm cả nội dung chúng tôi đề xuất và nội dung đóng góp của người dùng. Chúng tôi luôn cố gắng hết sức để đảm bảo hệ thống luôn sẵn sàng phục vụ người dùng, trường hợp chúng tôi nâng cấp, bảo trì, hoặc đóng cửa hệ thống sẽ không cần phải báo trước. Tất cả người dùng tự chịu trách nhiệm về việc bảo quản thông tin tài khoản cá nhân của mình.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/write/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/write/main.html",
    "<div class=\"input-group input-group-lg input-group-write col-md-8 col-sx-12\">\n" +
    "    <input type=\"text\" placeholder=\"Nhập vào chữ kanji, ví dụ 日\" maxlength=\"10\" id=\"draw-text-box\" class=\"form-control\" ng-model=\"form.kanji\" ng-enter=\"searchKanji()\">\n" +
    "    <div class=\"input-group-btn\" ng-click=\"searchKanji()\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" id=\"search-button\" tabindex=\"-1\">\n" +
    "            <span class=\"fa fa-play fa-lg\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"result-draw-kanji-write\" ng-if=\"showDrawKanji\">\n" +
    "	<ng-kanji-draw data=\"data.kanji\"></ng-kanji-draw>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"alert alert-danger alert-write\" ng-if=\"showResultNull\">\n" +
    "	Tiếng Nhật không có từ ngày!\n" +
    "</div>");
}]);

angular.module("views/write/right.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/write/right.html",
    "");
}]);

angular.module("components/example/example-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/example/example-template.html",
    "<div class=\"example-container\" ng-if=\"mergeExample != null\">\n" +
    "    <div class=\"example-index\" ng-if=\"index != null\">{{ index }}.</div>\n" +
    "    <div class=\"example-word sentence-exam\">\n" +
    "        <span ng-if=\"isJapanese\">\n" +
    "            <ruby ng-repeat=\"me in mergeExample\">\n" +
    "                {{ me.k }} <rt>{{ me.h }}</rt>\n" +
    "            </ruby>\n" +
    "        </span>\n" +
    "        <span ng-if=\"!isJapanese\" ng-bind-html=\"data.content\">\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div class=\"example-mean-word sentence-exam\">\n" +
    "        <span ng-if=\"!isJapanese\">\n" +
    "            <ruby ng-repeat=\"me in mergeExample\">\n" +
    "                {{ me.k }} <rt>{{ me.h }}</rt>\n" +
    "            </ruby>\n" +
    "        </span>\n" +
    "        <span ng-if=\"isJapanese\" ng-bind-html=\"data.mean\">\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"example-container\" ng-if=\"mergeExample == null\">\n" +
    "    <div class=\"example-index\" ng-if=\"index != null\">{{ index }}.</div>\n" +
    "    <div class=\"example-word sentence-exam\">\n" +
    "        <span ng-if=\"isJapanese\" ng-bind-html=\"data.content\"></span>\n" +
    "        <span ng-if=\"!isJapanese\" ng-bind-html=\"data.mean\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"example-mean-word sentence-exam\">\n" +
    "        <span ng-if=\"!isJapanese\" ng-bind-html=\"data.content\"></span>\n" +
    "        <span ng-if=\"isJapanese\" ng-bind-html=\"data.mean\"></span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/footer/footer-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/footer/footer-template.html",
    "<div class=\"marketing\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"col-md-6 col-lg-6 scale\">\n" +
    "        <h3>Tải Mazii trên</h3>\n" +
    "        <a href=\"https://itunes.apple.com/app/apple-store/id933081417\" target=\"_blank\" onclick=\"ga('send', 'event', 'button', 'click', 'iphone-mobile-bottom')\"><img class=\"app-link big\" src=\"imgs/app_store_footer.png\"></a>\n" +
    "        <a href=\"https://play.google.com/store/apps/details?id=com.mazii.dictionary\" target=\"_blank\" onclick=\"ga('send', 'event', 'button', 'click', 'android-mobile-bottom')\"><img class=\"app-link big\" src=\"imgs/google_play.png\"></a>\n" +
    "        <a href=\"https://www.microsoft.com/store/apps/9NBLGGH3TCHJ\" target=\"_blank\" onclick=\"ga('send', 'event', 'button', 'click', 'wp-mobile-bottom')\"><img class=\"app-link big\" src=\"imgs/English_wstore_black_258x67_footer.png\"></a>\n" +
    "        <a href=\"https://chrome.google.com/webstore/detail/translate-japanese-mazii/lkjffochdceoneajnigkbdddjdekhojj\" target=\"_blank\" onclick=\"ga('send', 'event', 'button', 'click', 'chrome-extension-bottom')\"><img class=\"app-link\" src=\"imgs/chromewebstore.png\"></a>\n" +
    "        <ul class=\"list-menu-footer\">\n" +
    "          <li>\n" +
    "            <a href=\"#about\">Về Mazii</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#help\">Trợ giúp</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"#term\">Điều khoản sử dụng</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-6 col-lg-6\">\n" +
    "        <div class=\"fb-page\" data-href=\"https://www.facebook.com/maziinet/?fref=ts\" data-small-header=\"false\" data-adapt-container-width=\"true\" data-hide-cover=\"false\" data-show-facepile=\"true\" data-show-posts=\"false\"><div class=\"fb-xfbml-parse-ignore\"><blockquote cite=\"https://www.facebook.com/maziinet/?fref=ts\"><a href=\"https://www.facebook.com/maziinet/?fref=ts\">Mazii.net</a></blockquote></div></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>");
}]);

angular.module("components/google-translate/google-translate-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/google-translate/google-translate-template.html",
    "<div class=\"google-translate-result word-detail-content\">\n" +
    "        <div class=\"gogl-word-searched\">{{ data.sentences[0].orig }}</div>\n" +
    "        <div class=\"gogl-word-search-translit\" ng-if=\"data.sentences[1] && data.sentences[1].src_translit\"> {{ data.sentences[1].src_translit }} </div>\n" +
    "        <div class=\"gogl-word-search-trans\">{{ data.sentences[0].trans }} </div>\n" +
    "        <div class=\"gogl-word-search-translit\" ng-if=\"data.sentences[1] && data.sentences[1].translit\"> {{ data.sentences[1].translit }}</div>\n" +
    "        <div class=\"gogl-word-search-helper\">Dịch tự động</div>\n" +
    "    </div>");
}]);

angular.module("components/grammar/grammar-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/grammar/grammar-template.html",
    "<div class=\"panel panel-default\" ng-if=\"!showDetailImediately\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "            <a href=\"#collapseGrammar{{id}}\" class=\"grammar-open-link\" data-toggle=\"collapse\" data-parent=\"#grammar-list\" ng-click=\"loadDetail()\"> \n" +
    "                <div class='grammar-item-list'>{{ data.level }}:{{ title }}</div>\n" +
    "                <div class='grammar-item-mean'> {{ titleMean }} </div>\n" +
    "            </a>\n" +
    "        </h4>\n" +
    "    </div>\n" +
    "    <div id=\"collapseGrammar{{id}}\" class=\"panel-collapse collapse\">\n" +
    "        <div class=\"panel-body\" id=\"parent-detail-gr{{id}}\">\n" +
    "            <div class=\"grammar-usages\" ng-repeat=\"usage in detail.usages\">\n" +
    "                <div class=\"add-note-me\">\n" +
    "                    <button  ng-click=\"setQueryGrammar(usage.synopsis,'grammar_detail',id);\" class=\"btn btn-sm btn-default\" data-toggle=\"modal\" data-target=\"#myNote\">\n" +
    "                        <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <div class=\"gr-use-synopsis\" ng-bind-html=\"usage.synopsis\"></div>\n" +
    "                <div class=\"gr-use-explain\"><div class=\"gr-use-title\">意味：</div>　<span ng-bind-html=\"removeJapaneseChar(usage.mean)\"></span> </div>\n" +
    "                <div class=\"example-title\">例：</div>\n" +
    "                <ng-example data=\"exam\" ng-repeat=\"exam in usage.examples\" index=\"{{$index + 1}}\"></ng-example>\n" +
    "                <div class=\"gr-use-note\" ng-if=\"usage.explain != null && usage.explain != ''\">\n" +
    "                    <div class=\"gr-explain-title\">説明:</div>\n" +
    "                    <div class=\"gr-explain-note\" ng-repeat=\"expl in splitExplain(usage.explain)\" ng-bind-html=\"expl\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"gr-use-notice\" ng-if=\"usage.note != null\">\n" +
    "                    <div class=\"gr-notice-title\">注意:</div>\n" +
    "                    <div class=\"\" ng-bind-html=\"usage.note\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!--<ng-report data=\"data\" type=\"grammar\"></ng-report>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"grammar-usages\" ng-repeat=\"usage in detail.usages\" ng-if=\"showDetailImediately\">\n" +
    "    <div class=\"gr-use-synopsis\"> {{ usage.synopsis }} </div>\n" +
    "    <div class=\"gr-use-explain\"><div class=\"gr-use-title\">意味：</div>　<span ng-bind-html=\"removeJapaneseChar(usage.mean)\"></span> </div>\n" +
    "    <div class=\"example-title\">例：</div>\n" +
    "    <ng-example data=\"exam\" ng-repeat=\"exam in usage.examples\" index=\"{{$index + 1}}\"></ng-example>\n" +
    "    <div class=\"gr-use-note\" ng-if=\"usage.explain != null && usage.explain != ''\">\n" +
    "        <div class=\"gr-explain-title\">説明:</div>\n" +
    "        <div class=\"gr-explain-note\" ng-repeat=\"expl in splitExplain(usage.explain)\" ng-bind-html=\"expl\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"gr-use-notice\" ng-if=\"usage.note != null\">\n" +
    "        <div class=\"gr-notice-title\">注意:</div>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"note in splitNote(usage.note)\" ng-bind-html=\"note\" ng-if=\"note != ''\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <!--<ng-report data=\"detail\" type=\"grammarDetail\"></ng-report>-->\n" +
    "</div>\n" +
    "\n" +
    "<ng-note-content></ng-note-content>\n" +
    "<ng-category></ng-category>");
}]);

angular.module("components/history/history-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/history/history-template.html",
    "<div class=\"widget history-screen\">\n" +
    "    <div class=\"title-history\">\n" +
    "    	<span>Lịch sử tra cứu</span>\n" +
    "		<a class=\"btn btn-danger\" ng-click=\"deleteHistory()\">Xóa</a>\n" +
    "    </div><hr>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"history-item\" ng-repeat=\"item in history.slice().reverse() track by $index\" ng-click=\"search(item.type, item.query);\">\n" +
    "            <div class=\"history-type\" value=\"{{ item.type[0] }}\"> {{ item.type[0] }} </div>\n" +
    "            <div class=\"his-content\">{{ item.query }}</div>\n" +
    "            <div class=\"his-time\">{{ getTime(item.date) }}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/kanji-draw/kanji-draw-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/kanji-draw/kanji-draw-template.html",
    "<div class=\"kanji-draw-container\">\n" +
    "    <div id=\"image-holder\"></div>\n" +
    "    <div class=\"kanji-draw-again\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"resetDrawKanjiStroke()\">\n" +
    "            <i class=\"fa fa-repeat\"></i> Vẽ lại\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/kanji-recognize/kanji-recognize-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/kanji-recognize/kanji-recognize-template.html",
    "<div id=\"draw-table\">\n" +
    "    <canvas id=\"draw-canvas\">\n" +
    "    </canvas>\n" +
    "    <div id=\"draw-kanji-result\">\n" +
    "    </div>\n" +
    "    <div class=\"draw-kanji-buttons\">\n" +
    "        <button type=\"button\" id=\"draw-clear\" class=\"btn btn-default\">Clear</button>\n" +
    "        <button type=\"button\" id=\"draw-back\" class=\"btn btn-default\">Back</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/kanji-result-search-word/kanji-result-search-word-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/kanji-result-search-word/kanji-result-search-word-template.html",
    "<div class=\"kanji-container\">\n" +
    "    <div class=\"kanji-main-infor widget-container\" style=\"box-shadow: none\">\n" +
    "        <div class=\"pronoun-item\"><span class='kunyomi-text'>Bộ: </span><span>{{ data.kanji }} - {{ data.mean }}</span></div>\n" +
    "        <div class=\"pronoun-item\" ng-if=\"data.kun != null && data.kun != ''\"><span class='kunyomi-text'>訓:</span>  {{ data.kun }} </div>\n" +
    "        <div class=\"pronoun-item\" ng-if=\"data.on != null && data.on != ''\"><span class='kunyomi-text'>音:</span>  {{ data.on }} </div>\n" +
    "        <div class=\"pronoun-item\" ng-if=\"data.stroke_count != null\"><span class='kunyomi-text'>Số nét:</span> {{ data.stroke_count }} </div>\n" +
    "        <div class=\"level\" ng-if=\"data.level != null\"><span class='kunyomi-text'>JLPT:</span> {{ data.level }}</div>\n" +
    "        <div class=\"comp-detail\" ng-if=\"data.compDetail != null\"><span class='kunyomi-text'>Bộ thành phần: </span>\n" +
    "            <span class=\"kanji-component\" ng-repeat=\"cd in data.compDetail\">\n" +
    "                {{ cd.w }} <span ng-if=\"cd.h != null && cd.h != ''\"> {{ cd.h }}</span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <div class=\"short-mean\"><span class='kunyomi-text'>Nghĩa: </span>\n" +
    "		\n" +
    "            <p>{{ getTitle() }}</p>\n" +
    "            <ul class=\"list-collapse\">\n" +
    "                <li ng-repeat=\"mean in getDetails\">\n" +
    "                    {{ mean }}\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <a class=\"view-detail\" ng-click=\"viewDetail(data.kanji)\">Chi tiết hơn >></a>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("components/kanji/kanji-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/kanji/kanji-template.html",
    "<div class=\"kanji-container\">\n" +
    "    <div class=\"col-md-6 col-sx-12\">\n" +
    "        <div class=\"kanji-main-infor widget-container\">\n" +
    "            <div class=\"add-note-me\">\n" +
    "                <button  ng-click=\"setQueryType(data.kanji, 'kanji');\" class=\"btn btn-sm btn-default\" data-toggle=\"modal\" data-target=\"#myNote\">\n" +
    "                    <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"pronoun-item\"><span class='kunyomi-text'>Bộ: </span><span>{{ data.kanji }} - {{ data.mean }}</span></div>\n" +
    "            <div class=\"pronoun-item\" ng-if=\"data.kun != null && data.kun != ''\"><span class='kunyomi-text'>訓:</span>  {{ data.kun }} </div>\n" +
    "            <div class=\"pronoun-item\" ng-if=\"data.on != null && data.on != ''\"><span class='kunyomi-text'>音:</span>  {{ data.on }} </div>\n" +
    "            <div class=\"pronoun-item\" ng-if=\"data.stroke_count != null\"><span class='kunyomi-text'>Số nét:</span> {{ data.stroke_count }} </div>\n" +
    "            <div class=\"level\" ng-if=\"data.level != null\"><span class='kunyomi-text'>JLPT:</span> {{ data.level }}</div>\n" +
    "            <div class=\"comp-detail\" ng-if=\"data.compDetail != null\"><span class='kunyomi-text'>Bộ thành phần: </span>\n" +
    "                <span class=\"kanji-component\" ng-repeat=\"cd in data.compDetail\">\n" +
    "                    {{ cd.w }} <span ng-if=\"cd.h != null && cd.h != ''\"> {{ cd.h }}</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"short-mean\"><span class='kunyomi-text'>Nghĩa: </span>\n" +
    "    		\n" +
    "                {{ getTitle() }}\n" +
    "                <ul class=\"list-collapse\">\n" +
    "                    <span class='kunyomi-text'>Giải nghĩa: </span> \n" +
    "                    <li ng-repeat=\"mean in getDetails()\">\n" +
    "                        {{ mean }}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <p ng-if=\"collapse\"  ng-click=\"showCollapse()\" class=\"button-collapse\">\n" +
    "                    <i class=\"fa fa-angle-double-up fa-lg\"></i>\n" +
    "                </p>\n" +
    "                <p ng-if=\"!collapse\"  ng-click=\"showCollapse()\" class=\"button-collapse\">\n" +
    "                    <i class=\"fa fa-angle-double-down fa-lg\"></i>                    \n" +
    "                </p>\n" +
    "\n" +
    "            </div>\n" +
    "            <!--<ng-report data=\"data\" type=\"kanji\"></ng-report>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6 col-xs-12\">\n" +
    "        <div class=\"kanji-draw widget-container\">\n" +
    "            <ng-kanji-draw data=\"data.kanji\"></ng-kanji-draw>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"example-kanji widget-container col-md-12\">\n" +
    "        <b>Ví dụ:</b>\n" +
    "        <table class=\"table\">\n" +
    "            <thead>\n" +
    "              <tr>\n" +
    "                <th class=\"table-col-1\">#</th>\n" +
    "                <th class=\"table-col-2\">Từ</th>\n" +
    "                <th class=\"table-col-3\">Hiragana</th>\n" +
    "                <th class=\"table-col-4 td-hidden\">Hán Việt</th>\n" +
    "                <th class=\"table-col-5\">Nghĩa</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"exam in data.examples\">\n" +
    "                    <td class=\"table-col-1\">{{ $index + 1 }}</td>\n" +
    "                    <td class=\"table-col-2\" ng-click=\"search(exam.w)\">{{ exam.w }}</td>\n" +
    "                    <td class=\"table-col-3\">{{ exam.p }}</td>\n" +
    "                    <td class=\"table-col-4 td-hidden\">{{ exam.h }}</td>\n" +
    "                    <td class=\"table-col-5\">{{ exam.m }}</td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<ng-note-content></ng-note-content>\n" +
    "<ng-category></ng-category>\n" +
    "");
}]);

angular.module("components/news/newsother-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/news/newsother-template.html",
    "<div class=\"older-news widget-container\">\n" +
    "    <div class=\"news-title\">他のニュース</div>\n" +
    "    <hr class=\"other-news-hr-heading\">\n" +
    "	<div class=\"news-link\">\n" +
    "	    <a id=\"{{newsLink.value.id}}\" class=\"links-news-title\" ng-click=\"changeDetailNews(newsLink.id);\" ng-repeat=\"newsLink in lastestNews track by $index\" ng-class=\"getNewsReadClass(newsLink.value.id);\" >\n" +
    "	        <p ng-bind-html=\"newsLink.value.title\"></p>\n" +
    "	    </a>\n" +
    "	</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/notes/category-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/notes/category-template.html",
    "<div id=\"myCategory\" class=\"modal fade\" role=\"dialog\">\n" +
    "    <div class=\"modal-dialog modal-sm\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n" +
    "                <h4 class=\"modal-title\">Tạo nhóm từ</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "		    	<input type=\"text\" class=\"form-control\" ng-model=\"nameCategory\" placeholder=\"Nhập nhóm cần lưu\" ng-enter=\"saveCategory(nameCategory);\"/>\n" +
    "			</div>\n" +
    "			<div class=\"modal-footer\">\n" +
    "			    <button type=\"button\" class=\"btn btn-default\"  ng-click=\"saveCategory(nameCategory);\">Tạo</button>\n" +
    "			    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Đóng</button>\n" +
    "			</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/notes/note-content-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/notes/note-content-template.html",
    "<div id=\"myNote\" class=\"modal fade\" role=\"dialog\">\n" +
    "    <div class=\"modal-dialog modal-sm\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n" +
    "                <h4 class=\"modal-title\">Thêm từ vào</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <div class=\"content\" ng-if=\"category.length != 0\">\n" +
    "				    <div class=\"history-item\"  ng-repeat=\"item in category.slice().reverse() track by $index\">\n" +
    "				        <div class=\"his-content\" ng-click=\"saveNoteMe(item.category)\">{{ item.category }}</div>\n" +
    "				        <div class=\"his-time\">{{ getTime(item.date) }}</div>\n" +
    "				    </div>\n" +
    "				</div>\n" +
    "                <div ng-if=\"category.length == 0\">\n" +
    "                    Bạn chưa tạo nhóm từ nào\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#myCategory\">Tạo mới</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Đóng</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/notes/note-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/notes/note-template.html",
    "<div class=\"note-content-block\">\n" +
    "	<div class=\"widget-container\" ng-if=\"note.length != 0\">\n" +
    "		<div class=\"news-title\">\n" +
    "		    <div class=\"note-edit-content\">\n" +
    "                <button class='btn btn-default' ng-click=\"showEditNote()\">\n" +
    "                    <span class=\"glyphicon glyphicon-edit\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "		</div>\n" +
    "		<hr class=\"note-hr-heading\">\n" +
    "		<div class=\"note-item\" ng-if=\"note\" ng-repeat=\"item in note.slice().reverse() track by $index\">\n" +
    "			<div ng-if=\"item.type != 'grammar_detail'\">\n" +
    "				<div ng-click=\"search(item.type, item.query);\">\n" +
    "			    	<div class=\"history-type\" value=\"{{ item.type[0] }}\"> {{ item.type[0] }} </div>\n" +
    "			    	<div class=\"note-content\">{{ item.query }}</div>\n" +
    "			    	<div class=\"note-time\">{{ getTime(item.date) }}</div>\n" +
    "				</div>\n" +
    "			    <button class=\"btn btn-default btn-sm note-delete\" ng-class=\"getDeleteState()\" ng-click=\"deleteNote(item.id)\">\n" +
    "			    	<span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "			    </button>\n" +
    "			</div>\n" +
    "			<div ng-if=\"item.type == 'grammar_detail'\">\n" +
    "				<div ng-click=\"search(item.type, item.query);\">\n" +
    "			    	<div class=\"history-type\" value=\"{{ item.type[0] }}\"> {{ item.type[0] }} </div>\n" +
    "			    	<div class=\"note-content\">{{ item.query }}</div>\n" +
    "			    	<div class=\"note-time\">{{ getTime(item.date) }}</div>\n" +
    "				</div>\n" +
    "			    <button class=\"btn btn-default btn-sm note-delete\" ng-class=\"getDeleteState()\" ng-click=\"deleteGrammar(item.id)\">\n" +
    "			    	<span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "			    </button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"note.length == 0\">\n" +
    "		Không có từ trong nhóm.\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("components/notify/notify-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/notify/notify-template.html",
    "<p>\n" +
    "    <b>Phiên bản mới</b>\n" +
    "</p>\n" +
    "<p>Chào các bạn!</p>\n" +
    "<p>Mazii phiên bản mới có thêm tính năng:\n" +
    "<ul>\n" +
    "    <li>\n" +
    "        <a href=\"#note\">Từ vựng của tôi</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#chat\">Chat dịch nhanh</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "Mong các bạn đưa ra góp ý để nhóm hoàn thiện sản phẩm hơn.</p>\n" +
    "<p>Chân thành cảm ơn các bạn.</p>");
}]);

angular.module("components/report/report-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/report/report-template.html",
    "<span class=\"report-wrong\" ng-click=\"showReportDialog();\">Báo sai!</span>");
}]);

angular.module("components/review/review-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/review/review-template.html",
    "<div class=\"widget\">\n" +
    "    <div class=\"content\">\n" +
    "        \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/setting/setting-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/setting/setting-template.html",
    "<div class=\"setting-screen\">\n" +
    "    <div class=\"title-setting\">Tùy chỉnh</div><hr>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"checkbox\">\n" +
    "            <label>\n" +
    "                <input type=\"checkbox\" ng-change=\"showFurigana()\" ng-model=\"furigana\">\n" +
    "                <span>Hiện furigana (chữ hiragana nhỏ nằm trên chữ kanji)</span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"checkbox\">\n" +
    "            <label>\n" +
    "                <input type=\"checkbox\" ng-change=\"showSuggestSearch()\" ng-model=\"suggest\">\n" +
    "                <span>Bật tính năng gợi ý tìm kiếm</span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/synonyms/synonyms-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/synonyms/synonyms-template.html",
    "<div class=\"synonyms-result word-detail-content\" ng-if=\"data.synsets != null\">\n" +
    "    <div class=\"synonyms-header\">Từ đồng nghĩa của <b> {{ data.synsets[0].base_form }} </b></div>\n" +
    "    <div class=\"synonyms-word-type\" ng-if=\"data.synsets[0].pos != null\"> {{ data.synsets[0].pos }} </div>\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"entry in data.synsets[0].entry\">\n" +
    "            <span class=\"synonyms-word\" ng-repeat=\"synonym in entry.synonym\" ng-click=\"searchThis(synonym);\">\n" +
    "                {{ synonym }}<span ng-if=\"$index < entry.synonym.length - 1\">, </span>\n" +
    "            </span>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    " </div>");
}]);

angular.module("components/verb-conjugtion/verb-conjugtion-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/verb-conjugtion/verb-conjugtion-template.html",
    "<div class=\"verb-conjugation-container\">\n" +
    "    <div class=\"verb-title\">Bảng chia động từ: </div>\n" +
    "    <table class=\"verb-conjugation\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"form-column\">Tên thể (形)</th>\n" +
    "            <th class=\"word-column\">Từ</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"(key, value) in data\">\n" +
    "            <td class=\"form-column\"> {{value.name}} </td>\n" +
    "            <td class=\"word-column\"> {{value.word}} </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("components/word/word-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/word/word-template.html",
    "<div class=\"word-container widget-container\">\n" +
    "    <div class=\"main-word\">\n" +
    "        {{ ::data.word }}\n" +
    "    </div>\n" +
    "    <i class=\"audio-word fa fa-volume-down fa-lg\" ng-click=\"playAudio()\"></i>\n" +
    "    <div class=\"add-note-me\">\n" +
    "        <button  ng-click=\"setQueryType(data.word, 'word');\" class=\"btn btn-sm btn-default\" data-toggle=\"modal\" data-target=\"#myNote\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"phonetic-word\" ng-if=\"data.phonetic != null && data.phonetic != ''\">\n" +
    "        {{ ::data.phonetic }}\n" +
    "    </div> \n" +
    "    <div class=\"sound-button\" ng-click=\"playSound(data.word);\"></div>\n" +
    "    <div class=\"han-viet-word\" ng-if=\"amHanViet != null && amHanViet != ''\">\n" +
    "        「{{ ::amHanViet }}」\n" +
    "    </div>\n" +
    "    <div class=\"mean-detail-range\" ng-repeat=\"mean in data.noKinds\">\n" +
    "        <div class=\"type-word\" ng-if=\"mean.kind != null && mean.kind != ''\">☆ {{ convertKindToReadable(mean.kind) }} </div>\n" +
    "        <div class=\"mean-fr-word\">◆ {{ capitaliseFirstLetter(mean.mean) }} </div>\n" +
    "        <div class=\"example-range\">\n" +
    "            <ng-example ng-repeat=\"exam in mean.examples\"  data=\"exam\"></ng-example>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"mean-detail-range\" ng-repeat=\"(kind, means) in data.kinds\">\n" +
    "        <div class=\"type-word\">☆ {{ convertKindToReadable(kind) }} </div>\n" +
    "        <div ng-repeat=\"(index, mean) in means\">\n" +
    "            <div class=\"mean-fr-word\">◆ {{ capitaliseFirstLetter(mean.mean) }} </div>\n" +
    "            <div class=\"example-range\">\n" +
    "                <ng-example ng-repeat=\"exam in mean.examples\"  data=\"exam\"></ng-example>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--<ng-report data=\"data\" type=\"word\"></ng-report>-->\n" +
    "</div>\n" +
    "<div class=\"widget-container\" ng-if=\"conjugationVerb\">\n" +
    "    <ng-verb-conjugtion data=\"conjugationVerb\"></ng-verb-conjugtion>\n" +
    "</div>\n" +
    "\n" +
    "<ng-note-content></ng-note-content>\n" +
    "<ng-category></ng-category>");
}]);
