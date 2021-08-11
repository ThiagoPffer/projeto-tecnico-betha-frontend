appModule.factory("ordemServicoService", function($http, properties) {
    
    // OPERACOES NO BANCO

    var _insertOrdemServico = function(ordemServico) {
        return $http.post(properties.baseUrl + "/ordensservico", ordemServico);
    }

    var _getOrdensServico = function(pageId) {
        return $http.get(properties.baseUrl + "/ordensservico/page?page=" + pageId);
    }
    
    // VALIDACOES

    var _isEmailValid = function(searchInput) {
        if(searchInput != undefined && searchInput.email != "" && searchInput.email != undefined){
            return true;
        } else {
            return false
        }
    }

    var _isFormularyValid = function(item) {
        if(item != undefined){
            if(item.equipamento != undefined && item.descricao != undefined && item.descricao != undefined){
                if(item.descricao.length < 25 || item.avaria.length < 15){
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false
        }
    }

    var _isOrdemServicoValid = function(newOrdemServico) {
        if(newOrdemServico != undefined){
            if(newOrdemServico.idCliente != undefined && newOrdemServico.itens != undefined){
                if(newOrdemServico.itens.length != 0){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return {
        insertOrdemServico: _insertOrdemServico,
        getOrdensServico: _getOrdensServico,
        isEmailValid: _isEmailValid,
        isFormularyValid: _isFormularyValid,
        isOrdemServicoValid: _isOrdemServicoValid
    };
});