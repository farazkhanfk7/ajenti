angular.module('ajenti.hosts').controller('HostsIndexController', function($scope, $http, pageTitle, gettext, notify, messagebox) {
    pageTitle.set(gettext('Hosts'));

    $scope.showDetails = false;
    $scope.add_new = false;

    $http.get('/api/hosts').then( (resp) => {
	    $scope.hosts = resp.data.hosts;
    });

    $scope.edit = (host) => {
        $scope.edit_host = host;
        $scope.showDetails = true;
    }

    $scope.save = () => {
        $scope.showDetails = false;
        $http.post('/api/hosts', {config: $scope.hosts}).then( (resp) => {
            notify.success(gettext('Hosts successfully saved!'))
        });
    }

    $scope.add = () => {
        $scope.add_new = true;
        $scope.edit_host = {
            'address': '127.0.0.1',
            'name': 'localhost',
            'aliases': [],
        };
        $scope.showDetails = true;
    }

    $scope.saveNew = () => {
        $scope.reset()
        $scope.hosts.push($scope.edit_host);
        $scope.save();
    }

    $scope.remove = (host) => {
        messagebox.show({
            text: gettext('Do you really want to permanently delete this entry?'),
            positive: gettext('Delete'),
            negative: gettext('Cancel')
        }).then( () => {
            position = $scope.hosts.indexOf(host);
            $scope.hosts.splice(position, 1);
            $scope.save();
        })
    }

    $scope.reset = () => {
        $scope.showDetails = false;
        $scope.add_new = false;
    }
});

